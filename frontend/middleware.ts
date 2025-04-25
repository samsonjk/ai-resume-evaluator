// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to this route if not authenticated
  },
});

// Protect everything except the home and subscription page
export const config = {
  matcher: [
    // Match all paths except: api, static assets, login, home, and subscribe
    "/((?!api|_next/static|_next/image|favicon.ico|login|subscribe|$).*)",
  ],
};
