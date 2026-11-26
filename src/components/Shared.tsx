import ResponsiveImage from "./ResponsiveImage";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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
export function Card({ project: p, featured = false }: { project: Project; featured?: boolean }) {
  const imageLink = useRef<HTMLAnchorElement>(null);
  const [previewState, setPreviewState] = useState<"loading" | "loaded" | "failed">("loading");
  const markPreviewReady = useCallback((image: HTMLImageElement) => {
    const decoding = typeof image.decode === "function" ? image.decode() : Promise.resolve();
    void decoding.then(() => setPreviewState("loaded")).catch(() => setPreviewState("failed"));
  }, []);

  useEffect(() => {
    if (!featured || !p.image) return;
    const image = imageLink.current?.querySelector("img");
    if (image?.complete) {
      if (image.naturalWidth > 0) markPreviewReady(image);
      else setPreviewState("failed");
    }
  }, [featured, p.image, markPreviewReady]);

  const imageClassName = featured
    ? `world-project-image world-project-image--featured is-${previewState}`
    : "world-project-image";

  return (
    <article className="world-project" id={p.id}>
      <a ref={imageLink} href={`/work/${p.id}`} className={imageClassName}>
        {p.image ? (
          <>
            <span className="project-preview-label" aria-hidden="true">
              {featured ? <><strong>{shortName(p)}</strong><small>{previewState === "failed" ? "Preview unavailable" : "Loading preview"}</small></> : shortName(p)}
            </span>
            <ResponsiveImage
              src={p.image}
              alt={p.imageCaption || p.title}
              loading="lazy"
              width={p.imageWidth}
              height={p.imageHeight}
              onLoad={featured ? (event) => markPreviewReady(event.currentTarget) : undefined}
              onError={featured ? () => setPreviewState("failed") : undefined}
            />
          </>
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
