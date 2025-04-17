import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log("Auth check: ", req.auth);
  console.log("Request Pathname: ", req.nextUrl.pathname);

  if (
    !req.auth &&
    req.nextUrl.pathname !== "/login" &&
    req.nextUrl.pathname !== "/signup"
  ) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (
    req.auth &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/signup", "/dashboard", "/pets/:path*"],
  runtime: "nodejs",
};
