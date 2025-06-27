"use client"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc";

export function SignInButton() {
   return <Button onClick={() => signIn()}>Sign In</Button>
}


export function GoogleSignInButton() {
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get("callbackUrl") || "/"
   return (
      <Button onClick={() => signIn("google", { callbackUrl })}>
         <FcGoogle size={20} />
         Sign in with Google
      </Button>
   )
}