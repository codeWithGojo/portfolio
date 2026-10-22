import { useEffect, useRef, useState } from 'react';

// Native, finite animations: no dependency or perpetual JS render loop.
export function Motion() {
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('portfolio-motion') === 'off'; } catch { return false; }
  });
  const [reduced, setReduced] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    const off = paused || reduced;
    document.documentElement.dataset.motion = off ? 'off' : 'on';
    try { localStorage.setItem('portfolio-motion', paused ? 'off' : 'on'); } catch { /* Optional preference. */ }
    if (off || matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const animations = new Set<Animation>();
    const play = (el: HTMLElement, frames: Keyframe[], delay = 0, duration = 720) => {
      const animation = el.animate(frames, { duration, delay, easing: 'cubic-bezier(.16,1,.3,1)' });
      animations.add(animation); animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      const image = el.matches('.project-preview,.featured-project,.portrait-wrap');
      const index = [...(el.parentElement?.children ?? [])].indexOf(el);
      play(el, [{ opacity: .12, transform: image ? 'translateY(32px) scale(.965)' : 'translateY(24px)' }, { opacity: 1, transform: 'none' }], Math.min(index % 4, 3) * 55, image ? 900 : 700);
      observer.unobserve(el);
    }), { threshold: .08 });
    document.querySelectorAll<HTMLElement>('.hero-text > *, .portrait-wrap, .proof-strip > div, .section-kicker, .section-heading, .about-layout > *, .skill-row, .stack-group, .featured-project, .project-top, .project-preview, .why-note, .project-footer, .service-card, .timeline-item, .contact-heading, .contact-cards > *').forEach(el => observer.observe(el));
    let frame = 0;
    const update = () => { frame = 0; const total = document.documentElement.scrollHeight - innerHeight; if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`; };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener('scroll', scroll, { passive: true }); addEventListener('resize', scroll);
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
    const active = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) document.querySelectorAll<HTMLAnchorElement>('.nav-pill a').forEach(a => { if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); }); }), { rootMargin: '-15% 0px -60% 0px' });
    sections.forEach(el => active.observe(el));
    const portrait = document.querySelector<HTMLElement>('.portrait-wrap');
    const visibility = new IntersectionObserver(entries => entries.forEach(e => { (e.target as HTMLElement).dataset.resting = e.isIntersecting ? 'false' : 'true'; }));
    if (portrait) visibility.observe(portrait);
    const tilt = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !matchMedia('(hover: hover) and (pointer: fine)').matches || !portrait) return;
      const rect = portrait.getBoundingClientRect();
      portrait.style.setProperty('--portrait-x', `${((event.clientX - rect.left) / rect.width - .5) * 9}deg`);
      portrait.style.setProperty('--portrait-y', `${-((event.clientY - rect.top) / rect.height - .5) * 9}deg`);
    };
    const reset = () => { portrait?.style.setProperty('--portrait-x', '0deg'); portrait?.style.setProperty('--portrait-y', '0deg'); };
    portrait?.addEventListener('pointermove', tilt); portrait?.addEventListener('pointerleave', reset);
    const onToggle = (event: Event) => { const el = event.target; if (el instanceof HTMLDetailsElement && el.open) { const content = el.querySelector<HTMLElement>('.project-notes'); if (content) play(content, [{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],0,400); } };
    document.addEventListener('toggle', onToggle, true);
    return () => { observer.disconnect(); active.disconnect(); visibility.disconnect(); animations.forEach(a => a.cancel()); cancelAnimationFrame(frame); removeEventListener('scroll',scroll); removeEventListener('resize',scroll); portrait?.removeEventListener('pointermove',tilt); portrait?.removeEventListener('pointerleave',reset); reset(); document.removeEventListener('toggle',onToggle,true); };
  }, [paused, reduced]);
  return <><div className="reading-progress" aria-hidden="true"><div ref={progress} /></div><button className="motion-switch" type="button" aria-pressed={paused || reduced} disabled={reduced} onClick={() => setPaused(!paused)} title={reduced ? 'Reduced motion follows your device setting' : 'Control decorative animation'}><span aria-hidden="true">{paused || reduced ? '▷' : 'Ⅱ'}</span> {paused || reduced ? 'Motion off' : 'Pause motion'}</button></>;
}
