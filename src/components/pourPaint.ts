import { gsap } from 'gsap';

// The forward edge splits into three unequal tongues. The necks fill out as the pool spreads.
function silhouette(flow: number) {
  const tip = 1.17 + flow * .24;
  const neck = .52 + flow * .22;
  return `M -.82,-.18
    C -.86,-.65 -.42,-.92 -.08,-.87
    C .22,-.83 .38,-.95 .71,-.76
    C .98,-.60 1.08,-.44 .93,-.39
    C .78,-.34 .62,-.50 ${neck},-.30
    C .63,-.12 ${tip},-.29 ${tip},-.03
    C ${tip},.16 .78,.10 .73,.23
    C .66,.42 1.04,.32 .99,.52
    C .93,.73 .61,.63 .46,.76
    C .15,1.05 -.18,.79 -.44,.73
    C -.76,.65 -.86,.23 -.82,-.18 Z`;
}

export function pourPaint(button: HTMLButtonElement, dark: boolean, switchTheme: () => void) {
  const ns = 'http://www.w3.org/2000/svg';
  const overlay = document.createElementNS(ns, 'svg');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.classList.add('theme-paint');
  const group = document.createElementNS(ns, 'g');
  overlay.append(group);
  const layers = (dark ? ['#62504d', '#373033', '#151517'] : ['#c6a991', '#e8dace', '#faf6ef']).map(color => {
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('fill', color);
    group.append(path);
    return path;
  });

  const { left, top, width, height } = button.getBoundingClientRect();
  const x = left + width / 2, y = top + height / 2;
  const angle = Math.atan2(innerHeight / 2 - y, innerWidth / 2 - x);
  group.setAttribute('transform', `translate(${x} ${y}) rotate(${angle * 180 / Math.PI})`);
  // The silhouette contains this central rectangle even at its narrowest neck.
  // Fit all four screen corners inside it before changing the underlying theme.
  let coverage = 1;
  for (const cx of [0, innerWidth]) {
    for (const cy of [0, innerHeight]) {
      const dx = cx - x, dy = cy - y;
      const along = dx * Math.cos(angle) + dy * Math.sin(angle);
      const across = -dx * Math.sin(angle) + dy * Math.cos(angle);
      coverage = Math.max(coverage, along / .53, -along / .48, Math.abs(across) / .59);
    }
  }
  const state = { progress: 0 };
  let switched = false;
  function commit() {
    if (!switched) { switched = true; switchTheme(); }
  }
  function draw() {
    layers.forEach((path, i) => {
      const t = Math.max(0, state.progress * (1 + i * .055) - i * .055);
      const reach = 2 + coverage * t;
      const spread = 2 + coverage * t ** 1.35;
      path.setAttribute('transform', `scale(${reach} ${spread})`);
      path.setAttribute('d', silhouette(Math.sin(Math.PI * t)));
    });
  }
  draw();
  document.body.append(overlay);
  const timeline = gsap.timeline({ onComplete: () => overlay.remove() });
  timeline.to(state, { progress: 1, duration: .83, ease: 'power1.inOut', onUpdate: draw })
    .call(commit)
    .to(overlay, { opacity: 0, duration: .32, ease: 'sine.inOut' });
  return () => { timeline.kill(); commit(); overlay.remove(); };
}
