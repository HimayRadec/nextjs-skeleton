import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

const config = {
   pages: {
      signIn: "/signin",
   },
   providers: [
      Google,
   ],
   callbacks: {
      authorized: async ({ auth }) => {
         // Only allow access if logged in
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
