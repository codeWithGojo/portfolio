import { useEffect, useState } from "react";
import "../world-motion.css";

const INTRO_KEY = "imegu-identity-seen-v2";

/** CSS-only, optional circular signature: the page stays available underneath. */
export function CircularIdentityIntro() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    try { if (sessionStorage.getItem(INTRO_KEY) === "yes") return; } catch { /* Storage can be unavailable. */ }
    setVisible(true);
  }, []);
  useEffect(() => {
    if (!visible) return;
    try { sessionStorage.setItem(INTRO_KEY, "yes"); } catch { /* Storage can be unavailable. */ }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(() => setLeaving(true), 1650);
    const dismiss = (event: KeyboardEvent) => { if (event.key === "Escape") setLeaving(true); };
    const navigate = (event: MouseEvent) => { if ((event.target as Element).closest("a")) setLeaving(true); };
    const preference = () => { if (media.matches) setVisible(false); };
    const visibility = () => { if (document.hidden) setVisible(false); };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("click", navigate);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", preference);
    return () => { clearTimeout(timer); document.removeEventListener("keydown", dismiss); document.removeEventListener("click", navigate); document.removeEventListener("visibilitychange", visibility); media.removeEventListener("change", preference); };
  }, [visible]);
  useEffect(() => { if (!leaving) return; const timer = setTimeout(() => setVisible(false), 250); return () => clearTimeout(timer); }, [leaving]);
  if (!visible) return null;
  return <div className={`wm-identity${leaving ? " is-leaving" : ""}`}>
          <svg className="wm-identity-halo" viewBox="0 0 500 500" aria-hidden="true">
            <circle className="wm-identity-ring wm-identity-ring-outer" cx="250" cy="250" r="226" />
            <circle className="wm-identity-ring wm-identity-ring-inner" cx="250" cy="250" r="174" />
            <circle className="wm-identity-orbit" cx="250" cy="250" r="202" strokeDasharray="5 21 42 19 8 21" />
            <circle className="wm-identity-centre" cx="250" cy="250" r="140" />
            <path className="wm-identity-path" d="M 250 43 A 207 207 0 0 1 457 250" />
          </svg>
          <div className="wm-identity-copy">
            <span className="wm-identity-kicker">A PERSONAL SIGNATURE / 001</span>
            <strong>IMEGU<span>FAVOUR</span></strong>
            <span className="wm-identity-note">Welcome to my world.</span>
          </div>
          <button type="button" className="wm-identity-skip" onClick={() => setLeaving(true)}>
            Skip intro <span aria-hidden="true">↗</span>
          </button>
  </div>;
}
export default CircularIdentityIntro;
