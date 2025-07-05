'use client'

// React and Next.js
import { useState } from "react"
import { useRouter } from "next/navigation"

// React Hook Form
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// UI Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from "@/components/ui/form"
import { useSession } from "next-auth/react";

export default function UsernamePage() {
   return (
      <main className="flex flex-col items-center max-w-2xl mx-auto mt-6">
         <UpdateUsernameForm />
      </main>
   )
}

function UpdateUsernameForm() {
   const router = useRouter()
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const { data: session, update } = useSession();


   const formSchema = z.object({
      username: z.string().min(2, {
         message: "Username must be at least 2 characters.",
      }),
   })

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         username: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true)
      setError("")

      const res = await fetch("/api/set-username", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ username: values.username })
      })

      const data = await res.json()

      if (!res.ok) {
         setError(data.message || "Something went wrong")
         setLoading(false)
      }
      else {
         if (session?.user) {
            update({
               ...session.user,
               username: values.username // Update session with new username
            })
         }
         router.refresh()
         router.push("/dashboard")
      }
   }

   return (
      <div className="w-full">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                           <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormDescription>
                           This is your public display name.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               {error && <p className="text-sm text-red-500">{error}</p>}
               <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Submit"}
               </Button>
            </form>
         </Form>
      </div>
   )
}
