import NextAuth from "next-auth"
import authConfig from "@/auth.config"


export const { auth: middleware } = NextAuth(authConfig)
console.log("🔒 Middleware is running")


export const config = {
   matcher: ["/dashboard/:path*"], // Limit to just /dashboard for now
}