export function onRouterTransitionStart({ url, routerTransitionType }) {
  if (process.env.NODE_ENV === "development") {
    console.debug(`[nav] ${routerTransitionType} → ${url}`);
  }

  // Send navigation event to analytics in production
  // Example: analytics.track("navigation", { url, type: routerTransitionType })
}

// Global error tracking
window.addEventListener("error", (event) => {
  console.error("[client-error]", event.error?.message || event.message);

  // Forward to error tracking service in production
  // Example: Sentry.captureException(event.error)
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("[unhandled-rejection]", event.reason);

  // Forward to error tracking service in production
  // Example: Sentry.captureException(event.reason)
});

// Web Vitals monitoring
if (typeof PerformanceObserver !== "undefined") {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (process.env.NODE_ENV === "development") {
          console.debug(`[perf] ${entry.entryType}: ${entry.name}`, entry);
        }

        // Send to analytics in production
        // Example: analytics.track("web-vital", { name: entry.name, value: entry.startTime })
      }
    });

    observer.observe({ type: "largest-contentful-paint", buffered: true });
    observer.observe({ type: "layout-shift", buffered: true });
    observer.observe({ type: "long-animation-frame", buffered: true });
  } catch {
    // PerformanceObserver types not supported in this browser
  }
}
