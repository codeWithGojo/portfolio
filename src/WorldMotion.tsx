import {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, usePresence } from "motion/react";
import "./world-motion.css";

// Motion's installed hook snapshots this preference; keep live OS changes working too.
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

export { CircularIdentityIntro } from "./components/CircularIdentityIntro";

type DustCardProps = { children: ReactNode; animateEntrance: boolean };

/** Dissolve the real DOM through a fine grain mask; paint only the drifting dust. */
const DustCard = forwardRef<HTMLDivElement, DustCardProps>(function DustCard(
  { children, animateEntrance },
  forwardedRef,
) {
  const [isPresent, safeToRemove] = usePresence();
  const reduced = useReducedMotion();
  const content = useRef<HTMLDivElement>(null);
  const pieces = useRef<HTMLDivElement>(null);
  const entersWithPieces = useRef(animateEntrance);
  const hasStartedLeaving = useRef(false);
  useLayoutEffect(() => {
    const source = content.current;
    const layer = pieces.current;
    if (!source || !layer) return;
    if (!isPresent) hasStartedLeaving.current = true;
    const bounds = source.getBoundingClientRect();
    if (
      reduced ||
      document.hidden ||
      bounds.bottom < 0 ||
      bounds.top > window.innerHeight ||
      (isPresent && !entersWithPieces.current && !hasStartedLeaving.current)
    ) {
      if (!isPresent) safeToRemove?.();
      return;
    }
    const { width, height } = bounds;
    if (!width || !height) {
      if (!isPresent) safeToRemove?.();
      return;
    }
    const mobile = window.matchMedia("(max-width: 600px)").matches;
    const mask = document.createElement("canvas");
    // Each mask pixel is a 4–6px fragment, rather than a duplicated HTML card.
    mask.width = Math.ceil(width / (mobile ? 6 : 4));
    mask.height = Math.ceil(height / (mobile ? 6 : 4));
    const maskContext = mask.getContext("2d");
    const canvas = document.createElement("canvas");
    const padding = 120;
    canvas.width = Math.ceil(width + padding * 2);
    canvas.height = Math.ceil(height + padding * 2);
    canvas.className = "wm-dust-canvas";
    canvas.style.cssText = `left:-${padding}px;top:-${padding}px;width:${canvas.width}px;height:${canvas.height}px`;
    const context = canvas.getContext("2d");
    if (!maskContext || !context) {
      if (!isPresent) safeToRemove?.();
      return;
    }
    layer.append(canvas);
    const noise = maskContext.createImageData(mask.width, mask.height);
    const thresholds = new Float32Array(mask.width * mask.height);
    let randomState = 739;
    const random = () => {
      randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0;
      return randomState / 4294967296;
    };
    for (let index = 0; index < thresholds.length; index++) {
      // A ragged front sweeps from the right edge, scattering individual grains.
      thresholds[index] =
        0.07 + (1 - (index % mask.width) / mask.width) * 0.54 + random() * 0.21;
      noise.data[index * 4] =
        noise.data[index * 4 + 1] =
        noise.data[index * 4 + 2] =
          255;
    }
    const preview = source.querySelector("img");
    const previewBounds = preview?.getBoundingClientRect();
    let pixels: Uint8ClampedArray | undefined;
    if (preview?.complete && preview.naturalWidth) {
      try {
        const sample = document.createElement("canvas");
        sample.width = sample.height = 32;
        const sampleContext = sample.getContext("2d", {
          willReadFrequently: true,
        });
        sampleContext?.drawImage(preview, 0, 0, 32, 32);
        pixels = sampleContext?.getImageData(0, 0, 32, 32).data;
      } catch {
        /* Cross-origin photographs use the card's own text/accent palette. */
      }
    }
    const cardStyle = getComputedStyle(source);
    const palette = [
      cardStyle.color,
      cardStyle.getPropertyValue("--accent").trim() || "#9cadd0",
      "#8992a5",
    ];
    const grains = Array.from({ length: mobile ? 180 : 360 }, () => {
      const x = random() * width;
      const y = random() * height;
      let color = palette[Math.floor(random() * palette.length)];
      if (
        pixels &&
        previewBounds &&
        x > previewBounds.left - bounds.left &&
        x < previewBounds.right - bounds.left &&
        y > previewBounds.top - bounds.top &&
        y < previewBounds.bottom - bounds.top
      ) {
        const sx = Math.min(
          31,
          Math.floor(
            ((x - previewBounds.left + bounds.left) / previewBounds.width) * 32,
          ),
        );
        const sy = Math.min(
          31,
          Math.floor(
            ((y - previewBounds.top + bounds.top) / previewBounds.height) * 32,
          ),
        );
        const index = (sy * 32 + sx) * 4;
        color = `rgb(${pixels[index]} ${pixels[index + 1]} ${pixels[index + 2]})`;
      }
      return {
        x,
        y,
        color,
        delay: 0.03 + (1 - x / width) * 0.48,
        speed: 50 + random() * 65,
        lift: 25 + random() * 70,
        size: 0.7 + random() * 1.7,
        wobble: random() * 8,
      };
    });
    const duration = isPresent ? 650 : 820;
    let frame = 0;
    let finished = false;
    let observer: IntersectionObserver | undefined;
    let lastMaskFrame = -1;
    const started = performance.now();
    function clear() {
      cancelAnimationFrame(frame);
      source!.style.removeProperty("mask-image");
      source!.style.removeProperty("mask-size");
      source!.style.removeProperty("mask-repeat");
      source!.style.removeProperty("visibility");
      layer!.replaceChildren();
    }
    function finish() {
      if (finished) return;
      finished = true;
      clear();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      if (!isPresent) {
        source!.style.visibility = "hidden";
        safeToRemove?.();
      }
    }
    function draw(now: number) {
      if (finished) return;
      const elapsed = Math.min(1, (now - started) / duration);
      const progress = isPresent ? 1 - elapsed : elapsed;
      // The small mask updates at 20fps; lightweight dust positions run at display rate.
      const maskFrame = Math.floor((elapsed * duration) / 50);
      if (maskFrame !== lastMaskFrame) {
        lastMaskFrame = maskFrame;
        for (let index = 0; index < thresholds.length; index++)
          noise.data[index * 4 + 3] = progress < thresholds[index] ? 255 : 0;
        maskContext!.putImageData(noise, 0, 0);
        source!.style.maskImage = `url(${mask.toDataURL()})`;
        source!.style.maskSize = "100% 100%";
        source!.style.maskRepeat = "no-repeat";
      }
      context!.clearRect(0, 0, canvas.width, canvas.height);
      for (const grain of grains) {
        const travel = (progress - grain.delay) / (1 - grain.delay);
        if (travel <= 0 || travel >= 1) continue;
        context!.globalAlpha = Math.min(1, travel * 8) * (1 - travel);
        context!.fillStyle = grain.color;
        const x = padding + grain.x + travel * grain.speed;
        const y =
          padding +
          grain.y -
          travel * grain.lift +
          Math.sin(travel * 7) * grain.wobble;
        const size = grain.size * (1 - travel * 0.55);
        context!.fillRect(x, y, size, size);
      }
      if (elapsed >= 1) finish();
      else frame = requestAnimationFrame(draw);
    }
    function visibility() {
      if (document.hidden) finish();
    }
    observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) finish();
    });
    observer.observe(source);
    document.addEventListener("visibilitychange", visibility);
    draw(started);
    return () => {
      finished = true;
      clear();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [isPresent, reduced, safeToRemove]);
  return (
    <motion.div
      ref={forwardedRef}
      className="wm-dust-card"
      layout={!reduced}
      transition={{ layout: { type: "spring", stiffness: 310, damping: 32 } }}
      aria-hidden={!isPresent || undefined}
      inert={!isPresent || undefined}
    >
      <div ref={content} className="wm-dust-content">
        {children}
      </div>
      <div ref={pieces} className="wm-dust-pieces" aria-hidden="true" inert />
    </motion.div>
  );
});

export function DustGrid<T extends { id: string }>({
  items,
  renderItem,
  className = "",
  ariaLabel = "Projects",
}: {
  items: readonly T[];
  renderItem: (item: T) => ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const initialRender = useRef(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    initialRender.current = false;
  }, []);
  return (
    <div className={`wm-dust-grid ${className}`} aria-label={ariaLabel}>
      {reduced ? (
        items.map((item) => (
          <div key={item.id} className="wm-dust-card">
            <div className="wm-dust-content">{renderItem(item)}</div>
          </div>
        ))
      ) : (
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item) => (
            <DustCard key={item.id} animateEntrance={!initialRender.current}>
              {renderItem(item)}
            </DustCard>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

/** Mount inside a position:relative container. The photograph is decorative. */
export function ArsenalAtmosphere({
  imageSrc = "/arsenal-celebration-hd.webp",
  className = "",
}: {
  imageSrc?: string;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const filterId = `arsenal-water-${useId().replace(/:/g, "")}`;
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (reduced || !loaded || !root.current) return;
    let inView = false;
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    function stop() {
      clearInterval(interval);
      clearTimeout(timeout);
      interval = undefined;
      setActive(false);
    }
    function sync() {
      stop();
      if (inView && !document.hidden)
        interval = setInterval(() => {
          setActive(true);
          timeout = setTimeout(() => setActive(false), 1350);
        }, 3000);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(root.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [reduced, loaded]);
  return (
    <div
      className={`wm-arsenal-atmosphere ${className}`}
      ref={root}
      aria-hidden="true"
      data-active={active}
    >
      <svg className="wm-filter-definitions" width="0" height="0">
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".012 .028"
              numOctaves="1"
              seed="8"
              result="water"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="water"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>
      <img
        className="wm-arsenal-photo"
        src={imageSrc}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
      <img
        className="wm-arsenal-ripple"
        style={{ filter: `url(#${filterId})` }}
        src={imageSrc}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function StarboyEgg({
  imageSrc,
  className = "",
}: {
  imageSrc?: string;
  className?: string;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const title = useId();
  const description = useId();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!open) return;
    const element = dialog.current!;
    element.showModal();
    document.documentElement.classList.add("wm-starboy-mode");
    const timer = window.setTimeout(() => setOpen(false), 8500);
    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("wm-starboy-mode");
      element.close();
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <>
      <button
        type="button"
        className={`wm-cannon ${className}`}
        ref={trigger}
        onClick={() => setOpen(true)}
        aria-label="Discover a little Arsenal surprise"
        title="A little North London magic"
      >
        <svg
          width="34"
          height="24"
          viewBox="0 0 68 48"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m19 16 41-8 3 11-43 6M20 15l-9-2-2 16 14-2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle
            cx="29"
            cy="32"
            r="11"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="29" cy="32" r="3" fill="currentColor" />
          <path d="m42 30 13 9H41" stroke="currentColor" strokeWidth="3" />
        </svg>
      </button>
      <dialog
        ref={dialog}
        className="wm-starboy-dialog"
        aria-labelledby={title}
        aria-describedby={description}
        onCancel={() => setOpen(false)}
        onClose={() => {
          if (!dialog.current?.open) setOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        {open && (
          <div className="wm-starboy-scene" data-reduced={!!reduced}>
            <button
              className="wm-starboy-close"
              onClick={() => setOpen(false)}
              autoFocus
              aria-label="Close Starboy Mode"
            >
              ×
            </button>
            <span className="wm-starboy-kicker">NORTH LONDON, FOREVER.</span>
            {imageSrc ? (
              <img
                className="wm-starboy-photo"
                src={imageSrc}
                alt="Arsenal celebration"
              />
            ) : (
              <svg
                className="wm-starboy-player"
                viewBox="0 0 300 290"
                role="img"
                aria-label="Illustration of Saka's number seven shirt with arms raised in celebration"
              >
                <g className="wm-starboy-body">
                  <path
                    d="m107 126-40-43-21-44-17 7 19 55 49 57m98-29 39-47 17-44 17 7-16 56-47 58"
                    fill="#6d3828"
                  />
                  <path
                    d="m109 118-25 26 23 24 8 69 72 0 8-69 22-26-27-26-24-5h-33Z"
                    fill="#f9ece4"
                  />
                  <path d="m122 117-6 120h71l-8-120-18-6h-25Z" fill="#e3293b" />
                  <ellipse cx="151" cy="87" rx="26" ry="30" fill="#6d3828" />
                  <path
                    d="M125 81q-4-36 28-34 31 0 24 36-24-12-52-2"
                    fill="#191413"
                  />
                  <path
                    d="m116 237-9 49h33l12-39 10 39h33l-9-49"
                    fill="#f9ece4"
                  />
                  <text
                    x="152"
                    y="152"
                    textAnchor="middle"
                    fill="white"
                    fontSize="17"
                    fontFamily="sans-serif"
                    fontWeight="700"
                  >
                    SAKA
                  </text>
                  <text
                    x="152"
                    y="211"
                    textAnchor="middle"
                    fill="white"
                    fontSize="58"
                    fontFamily="sans-serif"
                    fontWeight="700"
                  >
                    7
                  </text>
                </g>
              </svg>
            )}
            <div className="wm-starboy-stars" aria-hidden="true">
              ✦ <span>✦</span> ✦
            </div>
            <h2 id={title}>
              STARBOY <span aria-hidden="true">★</span>
            </h2>
            <p id={description}>You've discovered Starboy Mode.</p>
            <span className="wm-starboy-footnote">
              A little Bukayo Saka appreciation.
            </span>
          </div>
        )}
      </dialog>
    </>
  );
}

export function PageReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function StoryCursor() {
  return (
    <span className="wm-story-cursor" aria-hidden="true">
      ▌
    </span>
  );
}
