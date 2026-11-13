import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-KM3TWNYSP7";

/**
 * Tracks virtual SPA pageviews into Google Tag Manager / dataLayer and GA4 on route changes.
 */
export function usePageTracking(): void {
  const location = useLocation();

  useEffect(() => {
    // Short timeout allows page-level useEffects to update document.title
    const timer = setTimeout(() => {
      const pagePath = location.pathname + location.search;
      const pageTitle = document.title;
      const pageLocation = window.location.href;

      // Push standard page_view event to dataLayer (for GTM triggers & GA4 tags)
      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: pagePath,
          page_title: pageTitle,
          page_location: pageLocation,
        });
      }

      // Call gtag directly for GA4
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          send_to: GA_MEASUREMENT_ID,
          page_path: pagePath,
          page_title: pageTitle,
          page_location: pageLocation,
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);
}

/**
 * Reusable helper to send custom events to Google Analytics & GTM
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      send_to: GA_MEASUREMENT_ID,
      ...params,
    });
  }
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}
