import { services } from "../content";
import { Button, Heading } from "../components/Shared";
export default function Pricing() {
  return (
    <div className="world-shell">
      <Heading label="04 / Services & pricing" title="A clear place to start.">
        <p>
          Tell me what you need. We’ll agree the scope, the deliverables and a
          price that reflects the work.
        </p>
      </Heading>
      <p className="world-note">
        Prices are quoted in Nigerian naira. The existing landing-page range is
        a guide; final quotations depend on features, content, integrations,
        hosting and maintenance.
      </p>
      <section className="package-grid world-section compact">
        {services.map((s) => (
          <article className="service-package" key={s.id}>
            <p className="world-label">{s.scope}</p>
            <h2>{s.title}</h2>
            <p>{s.for}</p>
            <strong className="package-price">
              {s.price || "Request a quote"}
            </strong>
            <ul>
              {s.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="package-upgrade">Optional: {s.upgrades}</p>
            {({"website-development":"website-development","ecommerce-development":"ecommerce-development","custom-software":"custom-software","erp-inventory":"erp-inventory"} as Record<string,string>)[s.id] && <a className="world-text-link" href={`/services/${s.id}`}>Explore this service ↗</a>}
            <Button href={`/contact?service=${s.id}`} secondary>
              Discuss {s.title.toLowerCase()}
            </Button>
          </article>
        ))}
      </section>
      <section className="world-section compact" aria-labelledby="service-questions">
        <p className="world-label">A few useful answers</p>
        <h2 id="service-questions">Before we scope the work.</h2>
        <details><summary>How much does a business website cost?</summary><p>The published ₦150,000–₦300,000 range is for a focused landing page. A multi-page business website is scoped and quoted after we agree what it needs to do.</p></details>
        <details><summary>Can you build an online store?</summary><p>E-commerce websites are among the services I offer. Catalogue, checkout and order requirements are discussed first so the quote reflects the actual shop.</p></details>
        <details><summary>Can you build custom dashboards or business systems?</summary><p>Yes. I take on web applications and ERP or internal-system projects involving roles, dashboards, reports and business workflows. Each is quoted to the agreed scope.</p></details>
        <details><summary>Do you maintain an existing website?</summary><p>I offer agreed fixes, updates and ongoing support. Tell me what you have and what needs attention to request a quote.</p></details>
      </section>
    </div>
  );
}
