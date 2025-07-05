import NextAuth from "next-auth"
import authConfig from "@/auth.config"


export const { auth: middleware } = NextAuth(authConfig)

//TODO: maybe allow other images like .png, .jpg, etc.
export const config = {
   matcher: [
      "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$|$).*)",
   ]
}
