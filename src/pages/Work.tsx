import { useEffect, useRef, useState, type FormEvent } from "react";
import { projects, type Project } from "../projects";
import { chapters, contact, services } from "../content";
import { CircularIdentityIntro, DustGrid, StarboyEgg, PageReveal, StoryCursor } from "../WorldMotion";
import { Button, Heading, Card, CTA, shortName } from "../components/Shared";
export default function Work() {
  const [filter, setFilter] = useState("All Projects");
  const [query, setQuery] = useState("");
  const personal = projects.filter((p) => p.id !== "wedding");
  const filtered = personal.filter(
    (p) =>
      (filter === "All Projects" ||
        (filter === "SaaS"
          ? p.id === "predictarena"
          : p.id !== "predictarena")) &&
      `${p.title} ${p.tech.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div className="world-shell">
      <Heading
        label="02 / The project library"
        title="Built out of curiosity. Made to be useful."
      >
        <p>
          Personal products, experiments and commissioned work. Real interfaces,
          real lessons, and a few things still taking shape.
        </p>
      </Heading>
      <section className="world-section compact">
        <div className="world-section-head">
          <h2>Personal projects</h2>
          <div className="work-controls">
            <label className="search-label">
              Find a project
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or technology"
              />
            </label>
            <div className="filter-control" aria-label="Project category">
              {["All Projects", "SaaS", "Regular Projects"].map((f) => (
                <button
                  key={f}
                  aria-pressed={f === filter}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        {filter === "SaaS" && (
          <p className="world-note">
            PredictArena’s subscription features are in development. This
            category describes its product direction, not a completed paid
            service.
          </p>
        )}
        <p className="world-label" role="status">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>
        <DustGrid
          items={filtered}
          renderItem={(p) => <Card project={p} />}
          className="world-project-grid"
          ariaLabel="Personal projects"
        />
        {!filtered.length && (
          <p>No projects match that search. Try another name or technology.</p>
        )}
      </section>
      <section className="world-section">
        <p className="world-label">Client & commissioned work</p>
        <h2>
          Built for someone else.
          <br />
          Still deeply personal.
        </h2>
        <div className="commissioned">
          <Card project={projects.find((p) => p.id === "wedding")!} />
          <p>
            My aunt’s wedding website reminded me that a project’s best outcome
            isn’t always a number. Sometimes it’s the way someone sounds when
            they see it.
          </p>
        </div>
      </section>
      <section className="world-section">
        <p className="world-label">Currently building</p>
        <h2>The work continues.</h2>
        <div className="capability-grid">
          {projects
            .filter((p) =>
              ["afri-index", "squadhub", "predictarena"].includes(p.id),
            )
            .map((p) => (
              <article key={p.id}>
                <h3>
                  <a href={`/work/${p.id}`}>{shortName(p)} ↗</a>
                </h3>
                <p>{p.status}</p>
                <p>{p.challenge}</p>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
