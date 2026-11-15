import assert from "node:assert/strict";
import test from "node:test";
import { createContactHandler } from "../server/contact.mjs";

const URL = "https://portfolio.example/api/contact";
const base = { name: "A Visitor", email: "visitor@example.net", message: "I’d like to discuss a website." };
const env = { RESEND_API_KEY: "mock-key", CONTACT_FROM_EMAIL: "form@example.com", CONTACT_TO_EMAIL: "owner@example.com", VERCEL: "1" };
const log = { error() {} };
function request(input = base, headers = {}) {
  return new Request(URL, {
    method: "POST",
    headers: { Origin: "https://portfolio.example", "Content-Type": "application/json", "x-vercel-forwarded-for": "203.0.113.1", ...headers },
    body: JSON.stringify(input),
  });
}

test("only displays success after Resend accepts the message", async () => {
  const contact = createContactHandler({ env, log, send: async (url, init) => {
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(init.headers.Authorization, "Bearer mock-key");
    const payload = JSON.parse(init.body);
    assert.deepEqual(payload.to, ["owner@example.com"]);
    assert.match(payload.from, /form@example\.com/);
    assert.equal(payload.reply_to, base.email);
    assert.equal(payload.subject, "New portfolio enquiry");
    assert.match(payload.text, /<script>not HTML<\/script>/);
    assert.equal(payload.html, undefined);
    return Response.json({ id: "mock-accepted-id" });
  } });
  const result = await contact(request({ ...base, message: "<script>not HTML</script>" }));
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("cache-control"), "no-store");
  assert.deepEqual(await result.json(), { ok: true });
});

test("rejects suspicious, invalid, and oversized submissions without sending", async () => {
  let calls = 0;
  const contact = createContactHandler({ env, log, send: async () => { calls++; } });
  assert.equal((await contact(new Request(URL))).status, 405);
  assert.equal((await contact(request(base, { Origin: "https://elsewhere.example" }))).status, 403);
  assert.equal((await contact(request(base, { Origin: "https://portfolio.example", "Sec-Fetch-Site": "cross-site" }))).status, 403);
  assert.equal((await contact(request(base, { "Content-Type": "text/plain" }))).status, 415);
  assert.equal((await contact(request({ ...base, website: "https://spam.example" }))).status, 400);
  assert.equal((await contact(request({ ...base, message: "X".repeat(20_000) }))).status, 413);
  assert.equal((await contact(request({ ...base, budget: "Not a range" }))).status, 400);
  const invalid = await contact(request({ ...base, email: "visitor@example.com\nBcc: elsewhere@example.com" }));
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).field, "email");
  assert.equal(calls, 0);
});

test("missing configuration and provider failure never return success", async () => {
  const disabled = createContactHandler({ env: {}, log, send: async () => assert.fail("No provider request expected") });
  assert.equal((await disabled(request())).status, 503);
  for (const send of [
    async () => Response.json({ error: "private upstream details" }, { status: 401 }),
    async () => Response.json({}),
    async () => { throw new Error("private connection details"); },
  ]) {
    const result = await createContactHandler({ env, log, send })(request());
    assert.equal(result.status, 502);
    const payload = await result.json();
    assert.equal(payload.ok, undefined);
    assert.doesNotMatch(payload.error, /private|mock-key/);
  }
});

test("limits repeat attempts per IP and resets after the window", async () => {
  let time = 1;
  let sent = 0;
  const contact = createContactHandler({ env, log, now: () => time, send: async () => {
    sent++;
    return Response.json({ id: "mock-accepted-id" });
  } });
  for (let attempt = 0; attempt < 5; attempt++) assert.equal((await contact(request())).status, 200);
  const blocked = await contact(request(base, { "x-forwarded-for": "203.0.113.2" }));
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("retry-after"), "600");
  assert.equal(sent, 5);
  assert.equal((await contact(request(base, { "x-vercel-forwarded-for": "203.0.113.2" }))).status, 200);
  time += 600_000;
  assert.equal((await contact(request())).status, 200);
});
