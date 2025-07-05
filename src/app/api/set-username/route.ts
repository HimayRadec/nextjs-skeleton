// /app/api/set-username/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import client from "@/lib/db"
import { ObjectId } from "mongodb"

export async function POST(req: Request) {
   const session = await auth()

   if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
   }

   const { username } = await req.json()

   // Basic validation
   if (!username || typeof username !== "string" || username.length < 2) {
      return NextResponse.json({ message: "Invalid username" }, { status: 400 })
   }

   const usernameLowercased = username.toLowerCase()

   try {
      const db = client.db(process.env.DATABASE_NAME)
      const users = db.collection("users")

      const userId = new ObjectId(session.user.id)
      const userData = await users.findOne({ _id: userId })
      if (!userData) {
         return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      // If the user has already set a username, check cooldown
      // if (userData.usernameLastChanged) {
      //    const now = new Date()
      //    const dataUserNameLastChanged = new Date(userData.usernameLastChanged)
      //    const cooldownInMs = 1000 * 60 * 60 * 24 * 30 // TODO: Make this a configurable value, currently set to 30 days
      //    if (now.getTime() - dataUserNameLastChanged.getTime() < cooldownInMs) {
      //       const nextAvailable = new Date(dataUserNameLastChanged.getTime() + cooldownInMs)
      //       return NextResponse.json({
      //          message: `Username can only be changed once every 30 days. Next available: ${nextAvailable.toISOString()}`
      //       }, { status: 403 })
      //    }
      // }

      // Check for conflicts
      const userNameAlreadyExists = await users.findOne({ usernameLowercase: usernameLowercased })
      if (userNameAlreadyExists) {
         return NextResponse.json({ message: "Username already taken" }, { status: 400 })
      }

      // Update username and track change timestamp
      await users.updateOne(
         { _id: userId },
         {
            $set: {
               username,
               usernameLowercase: usernameLowercased,
               usernameLastChanged: new Date(),
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
