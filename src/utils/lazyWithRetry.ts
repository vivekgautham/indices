import { ComponentType, lazy, LazyExoticComponent } from "react";

/**
 * Wraps dynamic React.lazy imports with automated retry and cache-busting
 * to prevent blank screens when new production versions/chunks are deployed.
 */
export function lazyWithRetry<
  P = object,
  T extends ComponentType<P> = ComponentType<P>,
>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(async () => {
    const sessionKey = "chunk_force_refresh";
    const hasRefreshed = sessionStorage.getItem(sessionKey) === "true";

    try {
      const module = await factory();
      sessionStorage.removeItem(sessionKey);
      return module;
    } catch (error) {
      if (!hasRefreshed) {
        // Mark that we are refreshing once to fetch the latest bundle assets
        sessionStorage.setItem(sessionKey, "true");
        window.location.reload();
        return new Promise(() => {}); // Halt execution while page reloads
      }

      // If already refreshed and still failing, throw to ErrorBoundary
      sessionStorage.removeItem(sessionKey);
      throw error;
    }
  });
}
