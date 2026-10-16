import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  if (
    !session &&
    (pathname.startsWith("/orders") ||
      pathname.startsWith("/checkout") ||
      pathname.startsWith("/kitchen"))
  ) {
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/orders/:path*", "/checkout/:path*", "/kitchen/:path*"],
};