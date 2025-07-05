import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

const PUBLIC_ROUTES = ["/auth/signin", "/auth/signup", "/auth/forgot-password"]

const config = {
   pages: {
      signIn: "/auth/signin",
   },
   providers: [
      Google,
   ],
   callbacks: {
      authorized({ request: { nextUrl }, auth }) {
         // Only allow access if logged in
         const isLoggedIn = !!auth?.user;
         const role = auth?.user.role || 'user';

         const { pathname } = nextUrl;

         // Redirect to the dashboard if logged in and trying to access the signin page
         if (pathname.startsWith('/auth/signin') && isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));
         if (pathname.startsWith('/admin') && role !== 'admin') return Response.redirect(new URL('/dashboard', nextUrl));
         return !!auth
      },

      jwt({ token, user, trigger, session }) {
         if (user) {
            token.id = user.id as string;
            token.username = user.username as string;
            token.role = user.role as string;
         }
         if (trigger === "update" && session) {
            token = { ...token, ...session };
         }
         return token;
      },

      session({ session, token }) {
         session.user.id = token.id;
         session.user.username = token.username;
         session.user.role = token.role;

         console.log(`[AUTHJS SESSION]: ${JSON.stringify(session, null, 2)}\n`);
         return session;
      }


   },
} satisfies NextAuthConfig

export default config
