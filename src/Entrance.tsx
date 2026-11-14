import { useEffect, useId, useRef, useState } from "react";
import "./entrance.css";

export function Entrance() {
  const root = useRef<HTMLElement>(null);
  const orbit = useRef<HTMLDivElement>(null);
  const path = useId();
  useEffect(() => {
    const section = root.current!;
    const graphic = orbit.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let frame = 0;
    function draw() {
      frame = 0;
      if (reduced.matches) return;
      const travel = section.offsetHeight - graphic.parentElement!.offsetHeight;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(1, travel)));
      graphic.style.setProperty("--travel", String(progress));
      section.dataset.past = String(progress > .92);
    }
    function queue() { if (!frame) frame = requestAnimationFrame(draw); }
    function pointer(event: PointerEvent) {
      if (!fine.matches || reduced.matches) return;
      const bounds = section.getBoundingClientRect();
      graphic.style.setProperty("--pointer-x", `${(event.clientX - bounds.left - bounds.width / 2) / 55}px`);
      graphic.style.setProperty("--pointer-y", `${(event.clientY - innerHeight / 2) / 55}px`);
    }
    function reset() {
      graphic.style.removeProperty("--pointer-x");
      graphic.style.removeProperty("--pointer-y");
      if (reduced.matches) { graphic.style.removeProperty("--travel"); delete section.dataset.past; }
      else queue();
    }
    const observer = new IntersectionObserver(([entry]) => { section.dataset.visible = String(entry.isIntersecting); });
    observer.observe(section);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    section.addEventListener("pointermove", pointer);
    section.addEventListener("pointerleave", reset);
    reduced.addEventListener("change", reset);
    queue();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue);
      section.removeEventListener("pointermove", pointer); section.removeEventListener("pointerleave", reset);
      reduced.removeEventListener("change", reset);
    };
  }, []);
  return <section className="orbit-intro" aria-label="Portfolio introduction" ref={root}>
    <div className="orbit-sticky">
      <div className="orbit-art" ref={orbit}>
        <svg className="orbit-disc" viewBox="0 0 600 600" aria-hidden="true">
          <defs><path id={path} d="M 300,300 m -213,0 a 213,213 0 1,1 426,0 a 213,213 0 1,1 -426,0" /></defs>
          <circle className="orbit-track" cx="300" cy="300" r="277" pathLength="360" />
          <circle className="orbit-broken" cx="300" cy="300" r="253" pathLength="100" />
          <circle className="orbit-inner" cx="300" cy="300" r="177" />
          <text className="orbit-type"><textPath href={`#${path}`} textLength="1315" lengthAdjust="spacing">DEVELOPER • DESIGNER • CREATIVE • PROBLEM SOLVER • </textPath></text>
        </svg>
        <div className="orbit-title"><span>FAVOUR</span><span>IMEGU</span></div>
      </div>
      <div className="orbit-meta" aria-hidden="true"><span>PERSONAL PORTFOLIO</span><span>01 / INTRODUCTION</span></div>
      <a className="orbit-skip" href="#home">Skip intro <span aria-hidden="true">↘</span></a>
      <a className="orbit-scroll" href="#home">Scroll to explore <span aria-hidden="true">↓</span></a>
    </div>
  </section>;
}

const portraits = [
  { src: "/hero-graduation.webp", alt: "Favour Imegu in red graduation regalia and a navy cap against a burgundy backdrop", label: "Graduation" },
  { src: "/arsenal-celebration-hd.webp", alt: "An Arsenal player celebrating with the Premier League trophy", label: "Arsenal trophy celebration" },
];

export function PortraitSlideshow() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [reduced, setReduced] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const motion = () => setReduced(media.matches);
    const visibility = () => setTabVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .3 });
    observer.observe(root.current!);
    media.addEventListener("change", motion);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", motion);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!visible || !tabVisible || !ready || !playing || reduced) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % portraits.length), 5000);
    return () => window.clearInterval(timer);
  }, [visible, tabVisible, ready, playing, reduced]);
  return <figure className="hero-portraits" ref={root} aria-label="Featured photographs">
    <div className="hero-portrait-frame">
      {portraits.map((photo, index) => <img key={photo.src} src={photo.src} alt={photo.alt} aria-hidden={index !== active}
        className={index === active ? "is-current" : ""} loading={index ? "lazy" : "eager"} fetchPriority={index ? "low" : "high"}
        onLoad={index ? () => setReady(true) : undefined} />)}
    </div>
    <figcaption className="hero-portrait-caption">
      <span>{portraits[active].label}</span>
      <div className="hero-portrait-controls">
        {portraits.map((photo, index) => <button key={photo.src} type="button" aria-label={`Show ${photo.label}`} aria-pressed={index === active}
          onClick={() => { setPlaying(false); setActive(index); }}>0{index + 1}</button>)}
        {!reduced && <button type="button" onClick={() => setPlaying(value => !value)}>{playing ? "Pause" : "Play"}</button>}
      </div>
    </figcaption>
  </figure>;
}

