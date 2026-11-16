import { createElement, useEffect, useRef, type HTMLAttributes } from "react";
import "../styles/service-reveal.css";

type ServiceRevealProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "div";
};

/** Progressively enhance below-fold sections without hiding server-rendered content. */
export default function ServiceReveal({
  as = "section",
  className,
  children,
  ...props
}: ServiceRevealProps) {
  const element = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = element.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Leave the initial viewport and restored scroll positions undisturbed.
    if (preference.matches || node.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    const finish = () => {
      node.removeAttribute("data-service-reveal");
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (!preference.matches && !node.contains(document.activeElement)) {
          node.setAttribute("data-service-reveal", "active");
        }
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" },
    );
    const stop = () => {
      observer.disconnect();
      finish();
    };
    const handlePreference = () => {
      if (preference.matches) stop();
    };
    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === node && event.animationName === "service-section-enter") {
        finish();
      }
    };

    observer.observe(node);
    node.addEventListener("animationend", handleAnimationEnd);
    node.addEventListener("focusin", stop);
    preference.addEventListener("change", handlePreference);

    return () => {
      stop();
      node.removeEventListener("animationend", handleAnimationEnd);
      node.removeEventListener("focusin", stop);
      preference.removeEventListener("change", handlePreference);
    };
  }, [as]);

  return createElement(
    as,
    {
      ...props,
      ref: element,
      className: ["service-reveal", className].filter(Boolean).join(" "),
    },
    children,
  );
}
