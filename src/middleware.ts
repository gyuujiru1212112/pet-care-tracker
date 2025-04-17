// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/login";
  const isSignupPage = req.nextUrl.pathname === "/signup";

  if (!isAuth) {
    if (!isLoginPage && !isSignupPage) {
      // no session and not at signup/login page
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (isAuth) {
    if (isSignupPage || isLoginPage) {
      // has session but at signup/login page
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signup/:path*",
    "/login/:path*",
    "/dashboard/:path*",
    "/pets/:path*",
    "/api/:path*",
  ],
};
