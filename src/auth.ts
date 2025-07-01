import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import client from "@/lib/db"
import { nanoid } from "nanoid"
import { ObjectId } from "mongodb"



const databaseName = process.env.DATABASE_NAME;


export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: MongoDBAdapter(client, { databaseName }),
   session: { strategy: "jwt" },
   ...authConfig,
   events: {
      async createUser({ user }) {
         // TODO: Turn this into a proper function
         const db = client.db(databaseName)
         const users = db.collection("users")

         let username: string
         let usernameLowercase: string
         let tries = 0
         do {
            username = "user_" + nanoid(6)
            usernameLowercase = username.toLowerCase()
            const conflict = await users.findOne({ usernameLowercase })
            if (!conflict) break
            tries++
         } while (tries < 5)

         if (tries < 5) {
            await users.updateOne(
               { _id: new ObjectId(user.id) },
               {
                  $set: {
                     username,
                     usernameLowercase,
                  },
               }
            )
         }
         else {
            console.error("⚠️ Failed to generate unique username on user signup")
         }
      },
   },
})