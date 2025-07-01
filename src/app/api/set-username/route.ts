// /app/api/set-username/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import client from "@/lib/db"

export async function POST(req: Request) {
   const session = await auth()

   if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
   }

   const { username } = await req.json()

   // TODO: Add more validation (e.g., regex for allowed characters), length limits as global constants
   if (!username || typeof username !== "string" || username.length < 2) {
      return NextResponse.json({ message: "Invalid username" }, { status: 400 })
   }

   const usernameLowercase = username.toLowerCase()

   try {
      const db = client.db(process.env.DATABASE_NAME)
      const users = db.collection("users")

      const existing = await users.findOne({ usernameLowercase })
      if (existing) {
         return NextResponse.json({ message: "Username already taken" }, { status: 400 })
      }

      await users.updateOne(
         { email: session.user.email },
         {
            $set: {
               username,
               usernameLowercase,
            },
         }
      )

      return NextResponse.json({ message: "Username set successfully" })
   }
   catch (error) {
      console.error("Username update error:", error)
      return NextResponse.json({ message: "Internal server error" }, { status: 500 })
   }
}
