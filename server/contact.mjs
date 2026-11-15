import { isIP } from "node:net";

const MAX_BYTES = 16_384;
const WINDOW_MS = 10 * 60 * 1000;
const BUDGETS = new Set([
  "Under ₦150,000",
  "₦150,000–₦300,000",
  "₦300,000–₦750,000",
  "₦750,000+",
  "Let’s discuss",
]);
const EMAIL = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;
const CONTROL = /[\x00-\x1f\x7f]/;
const FALLBACK = "The contact form is unavailable right now. Please use email or WhatsApp.";

function response(status, payload, headers = {}) {
  return Response.json(payload, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", ...headers },
  });
}

function fail(status, error, field, headers) {
  return response(status, field ? { error, field } : { error }, headers);
}

function isEmail(value) {
  return value.length <= 254 && EMAIL.test(value) && !value.includes("..") &&
    !value.startsWith(".") && !value.split("@")[0].endsWith(".");
}

async function readJson(request) {
  if (Number(request.headers.get("content-length")) > MAX_BYTES) {
    throw new RangeError("Request too large");
  }
  if (!request.body) throw new SyntaxError("Missing body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let body = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) return JSON.parse(body + decoder.decode());
      bytes += value.byteLength;
      if (bytes > MAX_BYTES) {
        void reader.cancel().catch(() => {});
        throw new RangeError("Request too large");
      }
      body += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin || request.headers.get("sec-fetch-site") === "cross-site") return false;
  return origin === new URL(request.url).origin;
}

export function createContactHandler({
  env = process.env,
  send = globalThis.fetch,
  now = Date.now,
  log = console,
} = {}) {
  // This fallback is scoped to one warm Vercel instance. See docs/contact-setup.md.
  const attempts = new Map();
  let windowEnds = 0;
  let total = 0;

  function checkLimit(request) {
    const time = now();
    if (time >= windowEnds) {
      attempts.clear();
      windowEnds = time + WINDOW_MS;
      total = 0;
    }
    const forwarded = env.VERCEL === "1" ? request.headers.get("x-vercel-forwarded-for")?.trim() : "";
    const ip = forwarded && isIP(forwarded) ? forwarded : "unidentified";
    const count = attempts.get(ip) || 0;
    if (count >= 5 || total >= 30) return Math.ceil((windowEnds - time) / 1000);
    attempts.set(ip, count + 1);
    total++;
    return 0;
  }

  return async function contact(request) {
    if (request.method !== "POST") return fail(405, "Use POST to submit this form.", undefined, { Allow: "POST" });
    if (!isSameOrigin(request)) return fail(403, "Please submit from the portfolio contact page.");
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return fail(415, "Use JSON to submit this form.");
    }

    let input;
    try {
      input = await readJson(request);
    } catch (error) {
      return error instanceof RangeError
        ? fail(413, "That message is too large. Please shorten it and try again.", "message")
        : fail(400, "The form could not be read. Please try again.");
    }
    if (!input || typeof input !== "object" || Array.isArray(input)) return fail(400, "The form could not be read. Please try again.");
    if (input.website !== undefined && input.website !== "") return fail(400, "The form could not be accepted. Please use email or WhatsApp.");

    const field = (key, optional = false) => typeof input[key] === "string" ? input[key].trim() : optional && input[key] === undefined ? "" : null;
    const name = field("name");
    const email = field("email");
    const message = field("message");
    const projectType = field("projectType", true);
    const budget = field("budget", true);
    if (!name || name.length > 100 || CONTROL.test(name)) return fail(400, "Enter a name with up to 100 characters.", "name");
    if (!email || !isEmail(email)) return fail(400, "Enter a valid email address.", "email");
    if (!message || message.length < 10 || message.length > 3000 || CONTROL.test(message.replace(/[\r\n\t]/g, ""))) {
      return fail(400, "Enter a message between 10 and 3,000 characters.", "message");
    }
    if (projectType === null || projectType.length > 120 || CONTROL.test(projectType)) return fail(400, "Choose a project type or leave it blank.", "projectType");
    if (budget === null || (budget && !BUDGETS.has(budget))) return fail(400, "Choose a budget range or leave it blank.", "budget");

    const apiKey = env.RESEND_API_KEY?.trim();
    const from = env.CONTACT_FROM_EMAIL?.trim();
    const to = env.CONTACT_TO_EMAIL?.trim();
    if (!apiKey || !from || !to || !isEmail(from) || !isEmail(to)) {
      log.error("Contact email configuration is missing or invalid.");
      return fail(503, FALLBACK);
    }
    const retry = checkLimit(request);
    if (retry) return fail(429, "Too many messages. Try again in a few minutes or contact me directly.", undefined, { "Retry-After": String(retry) });

    try {
      const result = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Portfolio Contact <${from}>`,
          to: [to],
          reply_to: email,
          subject: "New portfolio enquiry",
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Project type: ${projectType || "Not specified"}`,
            `Budget: ${budget || "Not specified"}`,
            "",
            "Message:",
            message,
          ].join("\n"),
        }),
        redirect: "error",
        signal: AbortSignal.timeout(8000),
      });

      if (result.ok) {
        const data = await result.json();
        if (typeof data?.id === "string" && data.id.trim()) return response(200, { ok: true });
      }
      log.error("Resend did not accept the contact email.", { status: result.status });
    } catch {
      log.error("Contact email request failed.");
    }

    return fail(502, "I couldn’t confirm your message was sent. Please try again or use email or WhatsApp.");
  };
}
