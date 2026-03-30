import { NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/admin"];
const AUTH_COOKIE_NAME = "auth-token";

const SECURITY_HEADERS = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), browsing-topics=()",
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Request logging
  console.info(`[proxy] ${request.method} ${pathname}`);

  // Auth check for protected routes
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Rate limiting integration point
  // To add rate limiting, integrate with Upstash, Redis, or a similar service:
  // const { success } = await ratelimit.limit(request.ip ?? "anonymous")
  // if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 })

  // Apply security headers to the response
  const response = NextResponse.next();

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
