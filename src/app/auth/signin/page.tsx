"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import CredentialsSignInForm from "@/components/credentials-signin-form";
import { GoogleSignInButton } from "@/components/signin-buttons";

import { z } from "zod";
import { emailSignInSchema } from "@/lib/zod";
import ErrorMessage from "@/components/error-message";
import { handleCredentialsSignin } from "@/app/actions/authActions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
   const params = useSearchParams();
   const error = params.get("error");
   const router = useRouter();

   const [globalError, setGlobalError] = useState<string>("");

   // Handle error from query parameters
   useEffect(() => {
      if (error) {
         switch (error) {
            case "OAuthAccountNotLinked":
               setGlobalError(
                  "Account already exists use your email and password to sign in." // TODO: make this error a variable
               );
               break;
            default:
               setGlobalError(
                  "An unexpected error occurred. Please try again."
               );
         }
      }
      router.replace("/auth/signin");
   }, [error, router]);

   const form = useForm<z.infer<typeof emailSignInSchema>>({
      resolver: zodResolver(emailSignInSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   // Function to handle form submission
   const onSubmit = async (values: z.infer<typeof emailSignInSchema>) => {
      try {
         const result = await handleCredentialsSignin(values);
         if (result?.message) {
            setGlobalError(result.message);
         }
      }
      catch (error) {
         console.log(`An unexpected error occurred. Please try again. Error: ${error}`);
      }
   };

   return (
      <Card className="w-full border-none">
         <CardHeader>
            <CardTitle>
               Login to your account
            </CardTitle>
            <CardDescription>
               Enter your email below to login to your account
            </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            {globalError && <ErrorMessage error={globalError} />}
            <CredentialsSignInForm form={form} onSubmit={onSubmit} />
            <GoogleSignInButton />
         </CardContent>
         <CardFooter className="flex flex-col gap-2">
            <p>
               Don&apos;t have an account?{" "}
               <a href="/auth/signup" className="text-blue-500 hover:underline">
                  Sign up
               </a>
            </p>
            <a href="/auth/forgot-password" className="text-blue-500 hover:underline">
               Forgot your password?
            </a>
         </CardFooter>
      </Card>
   );
}