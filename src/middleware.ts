// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isAuth = !!token;
  const isLoginPage = req.nextUrl.pathname === "/login";
  const isSignupPage = req.nextUrl.pathname === "/signup";
  console.log("IsAuth: ", isAuth);

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (isAuth && (isSignupPage || isLoginPage)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

// Optional: Restrict which routes this middleware applies to
export const config = {
  matcher: [
    "/signup/:path*",
    "/login/:path*",
    "/dashboard/:path*",
    "/pets/:path*",
    "/api/pets/:path*",
  ],
};
