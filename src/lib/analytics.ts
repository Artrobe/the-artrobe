// GA4 measurement ID for theartrobe.in (stream 15483391484).
export const GA_ID = 'G-CXR7S6BD6J';

type GtagArgs = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: GtagArgs) => void;
  }
}

/**
 * Send a GA4 event. No-ops safely when gtag hasn't loaded — an ad blocker,
 * a failed script, or SSR should never break a click handler.
 */
export function track(event: string, params?: GtagArgs) {
  try {
    window.gtag?.('event', event, params);
  } catch {
    /* analytics must never break the page */
  }
}
