import { useEffect, useRef, useState, type FormEvent } from "react";
import { projects, type Project } from "../projects";
import { chapters, contact, services } from "../content";
import { CircularIdentityIntro, DustGrid, StarboyEgg, PageReveal, StoryCursor } from "../WorldMotion";
import { Button, Heading, Card, CTA, shortName } from "../components/Shared";
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
            <Button href={`/contact?service=${s.id}`} secondary>
              Discuss {s.title.toLowerCase()}
            </Button>
          </article>
        ))}
      </section>
    </div>
  );
}
