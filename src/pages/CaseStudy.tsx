import ResponsiveImage from "../components/ResponsiveImage";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { projects, type Project } from "../projects";
import { chapters, contact, services } from "../content";
import { CircularIdentityIntro, DustGrid, StarboyEgg, PageReveal, StoryCursor } from "../WorldMotion";
import { Button, Heading, Card, CTA, shortName } from "../components/Shared";
export default function CaseStudy({ project: p }: { project: Project }) {
  const afri = p.id === "afri-index";
  const wedding = p.id === "wedding";
  return (
    <article
      className={`world-shell case-study ${wedding ? "wedding-case" : ""}`}
    >
      <Heading label={`${p.tags[0]} / ${p.status}`} title={shortName(p)}>
        <p>{p.summary || p.why}</p>
      </Heading>
      <a href="/work" className="world-text-link">
        ← Back to all work
      </a>
      {p.image && (
        <figure className="case-hero">
          <a
            href={p.image}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open full screenshot of ${shortName(p)}`}
          >
            <ResponsiveImage
              src={p.image}
              alt={p.imageCaption || p.title}
              width={p.imageWidth}
              height={p.imageHeight}
            />
          </a>
          <figcaption>{p.imageCaption} · Open image to inspect</figcaption>
        </figure>
      )}
      {afri && (
        <section className="world-section story-feature">
          <p className="world-label">The passion project</p>
          <h2>It Started With an Argument.</h2>
          <p>
            My university roommates didn’t agree that Omah Lay deserved a place
            in the Afrobeats top 10. I started gathering streaming statistics,
            rankings and achievements to back up my argument. Somewhere along
            the way, I fell in love with building the project itself.
          </p>
          <blockquote>
            “Of everything I've built, Afri Index is probably the project
            closest to my heart. What started as an argument became something I
            genuinely fell in love with building.”
          </blockquote>
          <details>
            <summary>Why does this exist?</summary>
            <p>
              Because apparently “just agree to disagree” wasn’t enough for me.
              But loving Omah Lay doesn’t mean quietly moving him up the
              rankings. The methodology has to be transparent and defensible.
            </p>
          </details>
        </section>
      )}
      {wedding && (
        <section className="world-section story-feature">
          <p className="world-label">The heart project</p>
          <h2>The Moment That Made It Worth It.</h2>
          <p>
            I built this for my aunt, genuinely one of my favourite people. I
            put care into the little details, the visuals and the way the
            website felt.
          </p>
          <blockquote>
            My favourite moment wasn’t technical. It was hearing how happy she
            sounded when she first saw it.
          </blockquote>
          <p>
            That means more to me than any technical metric. I don’t think
            anything will take that moment away from me.
          </p>
        </section>
      )}
      <section className="world-section case-body">
        <div>
          <p className="world-label">Behind the build</p>
          <h2>What went into it.</h2>
          <div className="tech-tags">
            {p.tech.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {p.role && <p>{p.role}</p>}
          <div className="world-actions">
            {p.links.map((l) => (
              <Button key={l.href} href={l.href} secondary>
                {l.label}
              </Button>
            ))}
          </div>
        </div>
        <div>
          {[
            ["Why it exists", p.why],
            ["Design & development", p.built],
            ["The difficult part", p.challenge],
            ["What I learned", p.learned],
            ["Where it stands", p.outcome],
          ].map(([a, b]) => (
            <section key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </section>
          ))}
          {p.companion && (
            <section>
              <h3>{p.companion.title}</h3>
              <p>{p.companion.description}</p>
              <div className="world-actions">
                <Button href={p.companion.href} secondary>
                  Open companion tool
                </Button>
                <Button href={p.companion.github} secondary>
                  Source code
                </Button>
              </div>
            </section>
          )}
          {p.previewNote && <p className="world-note">{p.previewNote}</p>}
        </div>
      </section>
      {afri && (
        <section className="world-section">
          <h2>A project that keeps evolving.</h2>
          <div className="build-journey">
            {[
              [
                "01",
                "The roommate argument",
                "An opinion about Omah Lay became a question worth researching.",
              ],
              [
                "02",
                "The original idea",
                "Gather evidence rather than just make a louder argument.",
              ],
              [
                "03",
                "Early data gathering",
                "Streaming figures, rankings and achievements needed sources.",
              ],
              [
                "04",
                "First interface",
                "Learning through tutorials, templates and layout experiments.",
              ],
              [
                "05",
                "Design improvements",
                "Studying UI/UX and polishing the frontend one iteration at a time.",
              ],
              [
                "06",
                "Technical integrations",
                "Working through APIs, Supabase, Resend, authentication and database infrastructure along the wider development journey.",
              ],
              [
                "07",
                "The current platform",
                "A living index with an inspectable methodology; the current public build’s technologies are listed above.",
              ],
              [
                "08",
                "What comes next",
                "More reliable data and further improvements as time and budget allow. This is still evolving, not a completed commercial platform.",
              ],
            ].map(([n, t, c]) => (
              <details key={n}>
                <summary>
                  <span>{n}</span>
                  {t}
                </summary>
                <p>{c}</p>
              </details>
            ))}
          </div>
        </section>
      )}
      <CTA />
    </article>
  );
}
