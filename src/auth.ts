import NextAuth from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"
import authConfig from "@/auth.config"

const databaseName = process.env.DATABASE_NAME;


export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: MongoDBAdapter(client, { databaseName }),
   session: { strategy: "jwt" },
   ...authConfig,
})