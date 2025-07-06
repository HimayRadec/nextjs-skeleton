"use client"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc";

/**
 * A button component that redirects the user to the sign-in page.
 * When clicked, it triggers the NextAuth `signIn` function to start the authentication flow.
 */
export function SignInButton() {
   return <Button className="w-full" onClick={() => signIn()}>Sign In</Button>
}


export function GoogleSignInButton() {
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get("callbackUrl") || "/"
   return (
      <Button className="w-full" onClick={() => signIn("google", { callbackUrl })}>
         <FcGoogle size={20} />
         Sign in with Google
      </Button>
   )
}