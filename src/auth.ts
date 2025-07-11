import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

import NextAuth from "next-auth"
import authConfig from "@/auth.config"



export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },
   ...authConfig,
   events: {
      async createUser({ user }) {
      },
   },
})