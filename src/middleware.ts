// middleware.ts
import { auth } from "@/lib/auth";

export default auth((req) => {
  console.log("Auth check: ", req.auth); // Log the auth object to see if it is being set correctly
  console.log("Request Pathname: ", req.nextUrl.pathname); // Log the requested pathname

  // req.auth
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    req.auth &&
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup")
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pets/:path*",
    "/signup/:path*",
    "/login/:path*",
  ],
  runtime: "nodejs", // Force Node.js runtime instead of Edge
};
