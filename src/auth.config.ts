// the point of this file is to be able to use middleware with a database adapter on the edge runtime
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

export default {
   callbacks: {
      //  Require authentication for all pages by default through the middleware
      authorized: async ({ auth }) => {
         return !!auth
      },
   },
   pages: {
      signIn: "/signin",
   },
   providers: [
      Google,
   ],
} satisfies NextAuthConfig