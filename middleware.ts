import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth pages that should be accessible only when not signed in
const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/reset-password",
  "/verify",
  "/missing-verification",
];

// Legal pages that should be accessible to everyone
const publicRoutes = ["/privacy-policy", "/terms-and-conditions"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Allow access to public routes for everyone
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If the user is not signed in and trying to access protected routes
  if (!token && !isAuthPage) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If the user is signed in and trying to access auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If the user is signed in and has onboarding status, redirect to onboarding
  if (token && token.status === "onboarding") {
    // Only redirect if not already on onboarding page
    if (!request.nextUrl.pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  // If the user is signed in and has verified status, redirect to dashboard
  if (token && token.status === "verified") {
    // If trying to access in-review page, redirect to dashboard
    if (request.nextUrl.pathname.startsWith("/in-review")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If the user is signed in and has in_review status, restrict access
  if (token && (token.status === "in_review" || token.status === "rejected")) {
    const allowedPaths = ["/in-review", "/profile"];
    const isAllowedPath = allowedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    // Only redirect if not already on allowed pages
    if (!isAllowedPath) {
      return NextResponse.redirect(new URL("/in-review", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
