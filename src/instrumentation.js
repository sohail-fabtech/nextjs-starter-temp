export async function register() {
  console.info(
    `[instrumentation] Server started at ${new Date().toISOString()}`
  );

  if (process.env.NODE_ENV === "production") {
    // Initialize APM / OpenTelemetry / monitoring here
    // Example: await import("@vercel/otel").then(({ registerOTel }) => registerOTel("my-app"))
    // Example: await import("@sentry/nextjs").then((Sentry) => Sentry.init({ dsn: "..." }))
  }
}

export async function onRequestError({ err, request, context }) {
  const method = request.method;
  const url = request.url;
  const routeType = context.routeType;

  console.error(
    `[error] ${method} ${url} (${routeType}): ${err.message}`
  );

  if (process.env.NODE_ENV === "production") {
    // Forward to error tracking service (Sentry, DataDog, etc.)
    // Example: Sentry.captureException(err, { extra: { method, url, routeType } })
  }
}
