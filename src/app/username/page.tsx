'use client'

// React and Next.js
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

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


export default function UsernamePage() {
   // const { data: session, status } = useSession()
   // const router = useRouter()
   // const [username, setUsername] = useState("")
   // const [error, setError] = useState("")
   // const [loading, setLoading] = useState(false)

   // const handleSubmit = async (e: React.FormEvent) => {
   //    e.preventDefault()
   //    setLoading(true)
   //    setError("")

   //    const res = await fetch("/api/set-username", {
   //       method: "POST",
   //       headers: { "Content-Type": "application/json" },
   //       body: JSON.stringify({ username })
   //    })

   //    const data = await res.json()

   //    if (!res.ok) {
   //       setError(data.message || "Something went wrong")
   //       setLoading(false)
   //    } else {
   //       router.push("/")
   //    }
   // }



   return (
      <main className="flex flex-col items-center max-w-2xl mx-auto mt-6">
         <UpdateUsernameForm />
      </main>
   )
}

function UpdateUsernameForm() {
   const formSchema = z.object({
      username: z.string().min(2, {
         message: "Username must be at least 2 characters.",
      }),
   })
   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         username: "",
      },
   })

   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
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
               <Button type="submit">Submit</Button>
            </form>
         </Form>
      </div>
   )
}
