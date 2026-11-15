import ResponsiveImage from "./ResponsiveImage";
import type { ReactNode } from "react";
import type { Project } from "../projects";
export const shortName = (p: Project) =>
  p.id === "wedding"
    ? "BlessingFoundHerBlessing"
    : p.id === "afri-index"
      ? "Afri Index"
      : p.title.split(" — ")[0];
export const Button = ({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) => (
  <a
    className={secondary ? "world-button secondary" : "world-button"}
    href={href}
  >
    {children}
    <span aria-hidden="true">↗</span>
  </a>
);
export function Heading({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="world-page-heading">
      <p className="world-label">{label}</p>
      <h1>{title}</h1>
      {children && <div className="world-lead">{children}</div>}
    </header>
  );
}
export function Card({ project: p }: { project: Project }) {
  return (
    <article className="world-project" id={p.id}>
      <a href={`/work/${p.id}`} className="world-project-image">
        {p.image ? (
          <ResponsiveImage
            src={p.image}
            alt={p.imageCaption || p.title}
            loading="lazy"
            width={p.imageWidth}
            height={p.imageHeight}
          />
        ) : (
          <div className="project-type-art" aria-hidden="true">
            {shortName(p)}
            <span>{p.tags[0]}</span>
          </div>
        )}
        <span className="project-open" aria-hidden="true">
          ↗
        </span>
      </a>
      <div className="project-meta">
        <span>{p.tags[0]}</span>
        <span>{p.status}</span>
      </div>
      <h3>
        <a href={`/work/${p.id}`}>{shortName(p)}</a>
      </h3>
      <p>{p.summary || p.why}</p>
      <a className="world-text-link" href={`/work/${p.id}`}>
        Behind the build <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}
export function CTA() {
  return (
    <section className="world-cta world-shell">
      <p className="world-label">Have something in mind?</p>
      <h2>
        Let’s make
        <br />
        something useful.
      </h2>
      <Button href="/contact">Tell me about your project</Button>
    </section>
  );
}
