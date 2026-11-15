import { useEffect, useRef } from "react";
import { Analytics, track } from "@vercel/analytics/react";

export const analyticsEnabled = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_ENABLE_ANALYTICS === "true";
const allowedEvents = new Set(["service_page_view", "quote_cta_click", "whatsapp_click", "contact_form_success", "project_demo_click", "pricing_page_view"]);

export function recordConversion(name: string) {
  if (!analyticsEnabled || !allowedEvents.has(name)) return;
  track(name);
}

export function AnalyticsOptIn() {
  return analyticsEnabled ? <Analytics /> : null;
}

export function useRouteConversion(pathname: string) {
  const lastPath = useRef("");
  useEffect(() => {
    if (!analyticsEnabled || pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (pathname.startsWith("/services/")) recordConversion("service_page_view");
    if (pathname === "/pricing") recordConversion("pricing_page_view");
  }, [pathname]);
}
