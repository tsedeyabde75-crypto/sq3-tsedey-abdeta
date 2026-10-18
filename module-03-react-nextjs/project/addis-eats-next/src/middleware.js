import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/checkout', '/orders', '/kitchen'];

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const signinUrl = new URL('/signin', request.url);
    signinUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*'],
};