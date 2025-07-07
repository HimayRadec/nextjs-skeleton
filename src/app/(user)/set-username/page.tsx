'use client'

// React and Next.js
import { useState } from "react"
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"

// React Hook Form
import { useForm } from "react-hook-form"
import { z } from "zod"
import { usernameChangeSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"

// UI Components
import { useSession } from "next-auth/react";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SetUsernameForm from "@/components/forms/set-username-form"
import { Button } from "@/components/ui/button"
import { handleUsernameUpdate } from "@/app/actions/authActions"
import ErrorMessage from "@/components/error-message";

export default function UsernamePage() {
   return (
      <main className="flex flex-col items-center max-w-2xl mx-auto mt-6">
         <UpdateUsernameForm />
      </main>
   )
}

function UpdateUsernameForm() {
   const { data: session, update } = useSession();
   const router = useRouter(); // use this, not the import from 'next/router'
   const [globalError, setGlobalError] = useState<string>("");


   const form = useForm<z.infer<typeof usernameChangeSchema>>({
      resolver: zodResolver(usernameChangeSchema),
      defaultValues: { username: "" },
   })

   const onSubmit = async (values: z.infer<typeof usernameChangeSchema>) => {
      try {
         const result = await handleUsernameUpdate(values);

         if (result?.success) {
            await update({ ...session?.user, username: values.username });
            router.push("/dashboard");
            return;
         }

         if (result?.message) {
            setGlobalError(result.message);
         }
      }
      catch (error) {
         setGlobalError("An unexpected error occurred. Please try again.");
         console.log(`An unexpected error occurred. Please try again. Error: ${error}`);
      }
   };

   return (
      <div className="w-full border-none flex flex-col gap-6 py-6 lg:max-w-lg lg:mx-auto">
         <CardHeader>
            <CardTitle>
               Set Your Username
            </CardTitle>
            <CardDescription>
               Please enter a username to complete your profile setup.
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            {globalError && <ErrorMessage error={globalError} />}
            <SetUsernameForm
               form={form}
               onSubmit={onSubmit}
            />
         </CardContent>
         <CardFooter className="flex flex-col gap-2">
            <Button variant={"ghost"} onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
               Sign Out
            </Button>
         </CardFooter>
      </div>
   )
}
