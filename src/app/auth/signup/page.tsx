"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/loading-button";
import ErrorMessage from "@/components/error-message";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/zod";
import {
   handleCredentialsSignin,
   handleSignUp,
} from "@/app/actions/authActions";
import CredentialsSignUpForm from "@/components/credentials-signup-form";

export default function SignUp() {
   const [globalError, setGlobalError] = useState("");

   const form = useForm<z.infer<typeof signUpSchema>>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmPassword: "",
      },
   });

   const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
      try {
         const result: ServerActionResponse = await handleSignUp(values);
         if (result.success) {
            console.log("Account created successfully.");
            const valuesForSignin = {
               email: values.email,
               password: values.password,
            };
            await handleCredentialsSignin(valuesForSignin);
         } else {
            setGlobalError(result.message);
         }
      } catch (error) {
         setGlobalError("An unexpected error occurred. Please try again.");
      }
   };

   return (
      <Card className="w-full border-none">
         <CardHeader>
            <CardTitle>
               Create Account
            </CardTitle>
            <CardDescription>
               Fill in the form below to create a new account
            </CardDescription>
         </CardHeader>
         <CardContent>
            {globalError && <ErrorMessage error={globalError} />}
            <CredentialsSignUpForm form={form} onSubmit={onSubmit} />
         </CardContent>
      </Card>
   );
}