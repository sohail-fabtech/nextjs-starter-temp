"use client";

import { useEffect } from "react";

export function SwRegister() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    // Only register in production or when explicitly enabled
    const isEnabled =
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PUBLIC_ENABLE_SW === "true";

    if (!isEnabled) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.info("[sw] Service worker registered");

        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          newWorker?.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.info("[sw] New version available — refresh to update");
              // Integrate with useUIStore to show an update banner/toast
            }
          });
        });
      })
      .catch((error) => {
        console.error("[sw] Registration failed:", error);
      });

    // Detect when a new service worker takes control
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.info("[sw] New service worker activated");
    });
  }, []);

  return null;
}
