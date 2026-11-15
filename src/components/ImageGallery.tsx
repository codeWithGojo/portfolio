import { useEffect, useId, useRef, useState } from "react";
import "../styles/interactive.css";

export type GalleryImage = { src: string; srcSet?: string; width: number; height: number; alt: string; title: string; caption: string; compact?: boolean };

/** The first image is useful before hydration; automatic playback is always optional. */
export function ImageGallery({ images, label }: { images: readonly GalleryImage[]; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [manual, setManual] = useState(false);
  const id = useId();
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const preference = () => { setReduced(media.matches); if (media.matches) setPaused(true); };
    const visibility = () => setHidden(document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    preference(); visibility();
    media.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); media.removeEventListener("change", preference); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  const playing = images.length > 1 && !paused && !hovered && !focused && visible && !hidden && !reduced;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => { setManual(false); setActive(value => (value + 1) % images.length); }, 5000);
    return () => clearInterval(timer);
  }, [playing, images.length]);
  function choose(index: number) { setPaused(true); setManual(true); setActive((index + images.length) % images.length); }
  if (!images.length) return null;
  return <div ref={root} className="personal-gallery" role="region" aria-roledescription="carousel" aria-label={label}
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div id={id} className="personal-gallery-stage">
      {images.map((image, index) => <figure key={image.src} className={`personal-gallery-slide${index === active ? " is-active" : ""}${image.compact ? " is-compact" : ""}`} aria-hidden={index !== active} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${images.length}`}>
        <img src={image.src} srcSet={image.srcSet} sizes={image.compact ? "204px" : "(max-width: 760px) 90vw, 540px"} width={image.width} height={image.height} alt={image.alt} loading={visible ? "eager" : "lazy"} decoding="async"/>
        <figcaption><strong>{image.title}</strong><span>{image.caption}</span></figcaption>
      </figure>)}
    </div>
    <div className="personal-gallery-controls">
      <button type="button" onClick={() => choose(active - 1)} aria-label="Previous photograph" aria-controls={id}>←</button>
      <span aria-live={manual ? "polite" : "off"} aria-atomic="true">{String(active + 1).padStart(2, "0")} <span aria-hidden="true">/</span><span className="sr-only">of</span> {String(images.length).padStart(2, "0")}</span>
      <button type="button" onClick={() => choose(active + 1)} aria-label="Next photograph" aria-controls={id}>→</button>
      <button type="button" className="gallery-play" onClick={() => setPaused(value => !value)} disabled={reduced || images.length < 2} aria-label={paused || reduced ? "Play slideshow" : "Pause slideshow"}>{paused || reduced ? "Play" : "Pause"}<span aria-hidden="true">{paused || reduced ? "▷" : "Ⅱ"}</span></button>
    </div>
    <p className="gallery-motion-note">Use the arrows to explore at your own pace.</p>
  </div>;
}
