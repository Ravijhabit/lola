// protects routes

export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/create", "/items/:path*", "/users/:path*"],
};
