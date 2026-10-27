import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useDomMotion } from "../shared/motion/useDomMotion";

// Motion enhances visible content; nothing depends on an entrance completing.
export function Motion() {
  const reduced = useReducedMotion();
  useDomMotion();
  const progress = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const off = Boolean(reduced) || matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.motion = off ? "off" : "on";
    if (off || !("IntersectionObserver" in window) || !Element.prototype.animate) return;

    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const animations = new Set<Animation>();
    const cleanups: (() => void)[] = [];
    const play = (el: HTMLElement, frames: Keyframe[], delay = 0, duration = 850) => {
      const animation = el.animate(frames, { duration, delay, fill: "backwards", easing: "cubic-bezier(.16,1,.3,1)" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    document.querySelectorAll<HTMLElement>(".hero-line > span").forEach((el, i) => {
      play(el, [
        { transform: "translateY(110%) rotate(5deg)", opacity: 0 },
        { transform: "translateY(0) rotate(0)", opacity: 1 },
      ], i * 110, 1050);
    });
    const stage = document.querySelector<HTMLElement>(".folio-stage");
    if (stage) play(stage, [
      { transform: "perspective(1100px) translateY(55px) rotateY(-12deg) rotateX(8deg) rotate(-3deg)", opacity: 0 },
      { transform: "perspective(1100px) translateY(0) rotateY(0) rotateX(0) rotate(1deg)", opacity: 1 },
    ], 160, 1200);

    const seen = new WeakSet<Element>();
    const revealSelector = ".hero-copy,.hero-actions,.maker-note,.hero-topline,.hero-bottom,.proof-strip > div,.section-kicker,main h2,.section-heading > p,.body-copy,.skill-row,.stack-group,.featured-project,.project,.services-list article,.build-process > div,.pricing-landing,.pricing-row,.pricing-note,.timeline-item,.contact-copy,.contact-cards > *";
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      const index = [...(el.parentElement?.children ?? [])].indexOf(el);
      const headline = el.matches("h2");
      const card = el.matches(".featured-project,.project,.pricing-landing");
      play(el, [
        { opacity: headline ? .3 : .06, transform: `translateY(${card ? 48 : 28}px)${card ? " scale(.975)" : ""}`, ...(headline ? { clipPath: "inset(0 0 90% 0)" } : {}) },
        { opacity: 1, transform: "none", ...(headline ? { clipPath: "inset(0 0 -10% 0)" } : {}) },
      ], Math.min(index % 3, 2) * 65, headline ? 950 : 850);
      observer.unobserve(el);
    }), { threshold: .06 });
    const register = (scope: ParentNode) => scope.querySelectorAll<HTMLElement>(revealSelector).forEach(el => {
      if (!seen.has(el)) { seen.add(el); observer.observe(el); }
    });
    register(document);
    const changes = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
      if (node instanceof HTMLElement) {
        if (node.matches(revealSelector) && !seen.has(node)) { seen.add(node); observer.observe(node); }
        register(node);
      }
    })));
    changes.observe(document.querySelector("main")!, { childList: true, subtree: true });

    const active = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) document.querySelectorAll<HTMLAnchorElement>(".nav-pill a").forEach(a => {
        if (a.hash === `#${entry.target.id}`) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }), { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll<HTMLElement>("main > section[id]").forEach(el => active.observe(el));

    const hero = document.querySelector<HTMLElement>(".hero");
    const heroText = document.querySelector<HTMLElement>(".hero-text");
    const ribbon = document.querySelector<HTMLElement>(".motion-ribbon");
    const scrollImages = new Set<HTMLElement>();
    const visibleImages = new IntersectionObserver(entries => entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting) scrollImages.add(el); else { scrollImages.delete(el); el.style.removeProperty("--image-drift"); }
    }), { rootMargin: "80px" });
    document.querySelectorAll<HTMLElement>(".featured-image").forEach(el => visibleImages.observe(el));
    let heroVisible = true;
    let ribbonVisible = false;
    const viewport = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === ribbon) ribbonVisible = entry.isIntersecting;
      });
      updateVisibility();
      queueScroll();
    });
    if (hero) viewport.observe(hero);
    if (ribbon) viewport.observe(ribbon);
    const updateVisibility = () => {
      if (ribbon) ribbon.dataset.playing = String(ribbonVisible && !document.hidden);
      if (document.hidden) { animations.forEach(a => a.pause()); hideCursor(); }
      else animations.forEach(a => a.play());
    };
    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      if (document.hidden) return;
      const total = root.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0})`;
      if (heroVisible && hero && heroText && stage) {
        const travel = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight));
        const desktop = innerWidth > 800;
        heroText.style.translate = desktop ? `0 ${-travel * 42}px` : "none";
        stage.style.setProperty("--stage-drift", desktop ? `${travel * 65}px` : "0px");
      }
      if (fine.matches) scrollImages.forEach(el => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--image-drift", `${((rect.top + rect.height / 2) / innerHeight - .5) * -3}%`);
      });
    };
    function queueScroll() { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }
    queueScroll();
    addEventListener("scroll", queueScroll, { passive: true });
    addEventListener("resize", queueScroll);
    document.addEventListener("visibilitychange", updateVisibility);

    // Individual CSS transforms keep tilt and magnetic movement separate from reveals.
    document.querySelectorAll<HTMLElement>(".folio-stage,.featured-project").forEach(el => {
      let frame = 0;
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !fine.matches) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          el.style.setProperty("--tilt-x", `${(y - .5) * -6}deg`);
          el.style.setProperty("--tilt-y", `${(x - .5) * 8}deg`);
          el.style.setProperty("--shine-x", `${x * 100}%`);
          el.style.setProperty("--shine-y", `${y * 100}%`);
          el.dataset.hovered = "true";
        });
      };
      const reset = () => {
        cancelAnimationFrame(frame);
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
        delete el.dataset.hovered;
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); reset(); });
    });
    const magnets = document.querySelectorAll<HTMLElement>(".primary-link,.resume-link,.stage-caption > a");
    magnets.forEach(el => {
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || !fine.matches) return;
        const rect = el.getBoundingClientRect();
        el.style.translate = `${(e.clientX - rect.left - rect.width / 2) * .12}px ${(e.clientY - rect.top - rect.height / 2) * .18}px`;
      };
      const reset = () => { el.style.removeProperty("translate"); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      el.addEventListener("blur", reset);
      cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", reset); el.removeEventListener("blur", reset); reset(); });
    });

    let pointerFrame = 0;
    const hideCursor = () => { cancelAnimationFrame(pointerFrame); if (cursor.current) cursor.current.dataset.visible = "false"; };
    const pointer = (e: PointerEvent) => {
      if (!fine.matches || e.pointerType !== "mouse" || !(e.target instanceof Element)) { hideCursor(); return; }
      const target = e.target.closest(".featured-image,.stage-window a,.project-preview button,.companion-preview");
      if (!target) { hideCursor(); return; }
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        if (!cursor.current) return;
        cursor.current.dataset.visible = "true";
        cursor.current.style.translate = `${e.clientX}px ${e.clientY}px`;
        cursor.current.textContent = target.matches("button") ? "Enlarge ↗" : "Explore ↗";
      });
    };
    document.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerleave", hideCursor);
    const onToggle = (event: Event) => {
      if (event.target instanceof HTMLDetailsElement && event.target.open) {
        const content = event.target.querySelector<HTMLElement>(".project-notes");
        if (content) play(content, [{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], 0, 450);
      }
    };
    document.addEventListener("toggle", onToggle, true);
    return () => {
      observer.disconnect(); active.disconnect(); changes.disconnect(); viewport.disconnect(); visibleImages.disconnect();
      animations.forEach(a => a.cancel()); cleanups.forEach(cleanup => cleanup());
      cancelAnimationFrame(scrollFrame); cancelAnimationFrame(pointerFrame);
      removeEventListener("scroll", queueScroll); removeEventListener("resize", queueScroll);
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("pointermove", pointer); document.removeEventListener("pointerleave", hideCursor);
      document.removeEventListener("toggle", onToggle, true);
      heroText?.style.removeProperty("translate"); stage?.style.removeProperty("--stage-drift");
      scrollImages.forEach(el => el.style.removeProperty("--image-drift"));
      if (ribbon) ribbon.dataset.playing = "false";
      hideCursor();
    };
  }, [reduced]);

  return <><div className="reading-progress" aria-hidden="true"><div ref={progress} /></div><div className="project-cursor" ref={cursor} aria-hidden="true" /></>;
}
