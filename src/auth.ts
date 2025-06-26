import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"

const databaseName = process.env.DATABASE_NAME;


export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: MongoDBAdapter(client, { databaseName }),
   providers: [
      Google
   ],
})