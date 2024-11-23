import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    const user = await middlewareAuth(request);
    if (user) return NextResponse.redirect(new URL(`/`, request.nextUrl));
  }

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(request);
    if (!user)
      return NextResponse.redirect(new URL(`/signin`, request.nextUrl));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
