import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

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
         const { pathname } = nextUrl;
         // const role = auth?.user.role || 'user';

         // Redirect to the dashboard if logged in and trying to access the signin page
         if (pathname.startsWith('/auth/signin') && isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
         }

         return !!auth
      },

      async jwt({ token, user }) {
         if (user) {
            token.id = user.id
            token.username = user.username
         }
         return token
      },

      async session({ session, token }) {
         if (session.user) {
            session.user.id = token.id as string
            session.user.username = token.username as string
         }
         return session
      },
   },
} satisfies NextAuthConfig

export default config
