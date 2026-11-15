import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { contact, services } from "../content";
import { Button, Heading } from "../components/Shared";
import "../styles/contact.css";
import { recordConversion } from "../components/ConversionAnalytics";

const budgets = [
  "Under ₦150,000",
  "₦150,000–₦300,000",
  "₦300,000–₦750,000",
  "₦750,000+",
  "Let’s discuss",
];

const labels = ["name", "email", "projectType", "budget", "message"] as const;
type Field = (typeof labels)[number];
type Submission = {
  phase: "idle" | "sending" | "sent" | "failed";
  message?: string;
  field?: Field;
};
const sendError = "I couldn’t confirm your message was sent. Please try again or use email or WhatsApp.";
const serviceAliases: Record<string, string> = { "business-website": "website-development", ecommerce: "ecommerce-development", "web-application": "custom-software", "business-systems": "erp-inventory" };

export default function Contact() {
  const { search } = useLocation();
  const requestedService = new URLSearchParams(search).get("service") || "";
  const service = services.find((item) => item.id === (serviceAliases[requestedService] || requestedService));
  const [projectType, setProjectType] = useState("");
  const [queryReady, setQueryReady] = useState(false);
  const [submission, setSubmission] = useState<Submission>({ phase: "idle" });
  const inFlight = useRef(false);
  const sending = submission.phase === "sending";

  // Static prerendering cannot see the visitor's query string.
  useEffect(() => { setProjectType(service?.id ?? ""); setQueryReady(true); }, [service]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const get = (name: string) => String(values.get(name) ?? "").trim();
    const fields = {
      name: get("name"),
      email: get("email"),
      projectType: services.find((item) => item.id === get("projectType"))?.title ?? "",
      budget: get("budget"),
      message: get("message"),
      website: String(values.get("website") ?? ""),
    };

    function showError(message: string, field?: Field) {
      setSubmission({ phase: "failed", message, field });
      if (field) {
        const control = form.elements.namedItem(field);
        if (control instanceof HTMLElement) control.focus();
      }
    }

    if (!fields.name) return showError("Enter your name.", "name");
    if (fields.message.length < 10) return showError("Enter a message of at least 10 characters.", "message");

    inFlight.current = true;
    setSubmission({ phase: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(15_000),
      });
      const payload = await response.json().catch(() => null);
      if (response.ok && payload?.ok === true) {
        recordConversion("contact_form_success");
        const latest = new FormData(form);
        if (Array.from(values).every(([key, value]) => latest.get(key) === value)) {
          form.reset();
          setProjectType(service?.id ?? "");
        }
        setSubmission({ phase: "sent" });
      } else {
        showError(
          typeof payload?.error === "string" ? payload.error : sendError,
          labels.find((label) => label === payload?.field),
        );
      }
    } catch {
      showError(sendError);
    } finally {
      inFlight.current = false;
    }
  }

  function fieldState(name: Field) {
    return submission.field === name
      ? { "aria-invalid": true as const, "aria-describedby": "contact-error" }
      : {};
  }

  return (
    <div className="world-shell contact-page">
      <Heading label={queryReady && service ? `Contact / ${service.title}` : "Contact"} title={queryReady && service ? `Let’s talk about ${service.title.toLowerCase()}.` : "Tell me what you’re building."}>
        <p>{queryReady && service ? `A rough idea is enough. ${service.for} ${service.scope}.` : "A rough idea is enough. Tell me who it’s for and what you need it to do."}</p>
      </Heading>
      <div className="contact-page__grid">
        <aside className="contact-page__direct" aria-label="Contact options">
          <h2>Let’s talk.</h2>
          <p>Tell me about the website, product, or business system you have in mind.</p>
          <Button href={`${contact.whatsapp}?text=${encodeURIComponent("Hi Favour, I’d like to discuss a project.")}`}>
            Chat on WhatsApp
          </Button>
          <a className="contact-page__email" href={`mailto:${contact.email}`}>
            {contact.email} <span aria-hidden="true">↗</span>
          </a>
        </aside>
        <form
          className="contact-form"
          method="post"
          action="/api/contact"
          onSubmit={submit}
          onChange={() => {
            if (!inFlight.current && submission.phase !== "idle") setSubmission({ phase: "idle" });
          }}
          aria-labelledby="contact-form-title"
          aria-busy={sending}
        >
          <h2 id="contact-form-title">Send a message</h2>
          <div className="contact-form__row">
            <label>
              Name
              <input name="name" autoComplete="name" required maxLength={100} {...fieldState("name")} />
            </label>
            <label>
              Email
              <input name="email" type="email" autoComplete="email" required maxLength={254} {...fieldState("email")} />
            </label>
          </div>
          <div className="contact-form__row">
            <label>
              <span>Project type <small>(optional)</small></span>
              <select name="projectType" value={projectType} onChange={(event) => setProjectType(event.currentTarget.value)} {...fieldState("projectType")}>
                <option value="">Choose a type</option>
                {services.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
              </select>
            </label>
            <label>
              <span>Budget range <small>(optional)</small></span>
              <select name="budget" defaultValue="" {...fieldState("budget")}>
                <option value="">Choose a range (NGN)</option>
                {budgets.map((budget) => <option key={budget}>{budget}</option>)}
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea
              name="message"
              rows={5}
              minLength={10}
              maxLength={3000}
              required
              placeholder="What are you hoping to build?"
              {...fieldState("message")}
            />
          </label>
          <div className="contact-form__trap" aria-hidden="true" inert>
            <label>
              Leave this field empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <button className="world-button" type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
          </button>
          <div className="contact-form__status" role="status" aria-atomic="true">
            {submission.phase === "sent" && "Your message was sent. I’ll reply to the email you provided."}
          </div>
          {submission.phase === "failed" && <p className="contact-form__error" id="contact-error" role="alert">{submission.message}</p>}
        </form>
      </div>
    </div>
  );
}
