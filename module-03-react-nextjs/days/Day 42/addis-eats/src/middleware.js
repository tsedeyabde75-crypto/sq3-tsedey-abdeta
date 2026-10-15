import { NextResponse } from "next/server";

export async function middleware(request) {
  console.log("MIDDLEWARE IS RUNNING FOR:", request.nextUrl.pathname);

  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  if (!session) {
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/checkout/:path*", "/orders", "/orders/:path*"],
};