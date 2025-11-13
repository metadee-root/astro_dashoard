import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth pages that should be accessible only when not signed in
const authRoutes = ["/sign-in", "/sign-up", "/reset-password", "/verify"];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
