// middleware.ts
import { auth } from "@/lib/auth";

export default auth((req) => {
  console.log("Auth check: ", req.auth); // Log the auth object to see if it is being set correctly
  console.log("Request Pathname: ", req.nextUrl.pathname); // Log the requested pathname

  // req.auth
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    console.log("Enter");
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/dashboard/:path*", "/pets/:path*"],
  runtime: "nodejs", // Force Node.js runtime instead of Edge
};
