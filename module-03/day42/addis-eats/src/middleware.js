import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};