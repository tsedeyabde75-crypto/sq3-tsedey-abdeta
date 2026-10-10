import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  if (!session && (pathname.startsWith("/orders") || pathname.startsWith("/checkout"))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*"],
};