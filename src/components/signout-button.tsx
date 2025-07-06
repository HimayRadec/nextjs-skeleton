"use client"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function SignOutButton() {
   return (
      <Button className="w-full" onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
         Sign Out
      </Button>
   )
}