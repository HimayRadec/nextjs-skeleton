"use server";

import { signIn, signOut } from "@/auth";
import { signUpSchema } from "@/lib/zod";
import { AuthError } from "next-auth";

import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

export async function handleCredentialsSignin({ email, password }: {
   email: string,
   password: string
}) {
   try {
      await signIn("credentials", { email, password, redirectTo: "/dashboard" });
   }
   catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case 'CredentialsSignin':
               return {
                  message: 'Invalid credentials',
               }
            default:
               return {
                  message: 'Something went wrong.',
               }
         }
      }
      throw error;
   }
}

/**
 * Attempts to sign in a user using email and password credentials.
 * If successful, redirects the user to the "/set-username" page.
 * Handles authentication errors and returns a user-friendly message for known error types.
 *
 * @param params - An object containing the user's email and password.
 * @param params.email - The user's email address.
 * @param params.password - The user's password.
 * @returns A promise that resolves to an object with a `message` property if an authentication error occurs,
 *          or throws the error if it is not an instance of `AuthError`.
 */
export async function finishCredentialsSignUp({ email, password }: {
   email: string,
   password: string
}) {
   try {
      await signIn("credentials", { email, password, redirectTo: "/set-username" });
   }
   catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case 'CredentialsSignin':
               return {
                  message: 'Invalid credentials',
               }
            default:
               return {
                  message: 'Something went wrong.',
               }
         }
      }
      throw error;
   }
}


export async function handleGithubSignin() {
   await signIn("github", { redirectTo: "/dashboard" });
}

export async function handleGoogleSignin() {
   await signIn("google", { redirectTo: "/dashboard" });
}

export async function handleSignOut() {
   await signOut();
}


export async function handleCredentialsSignUp({ name, email, password, confirmPassword }: {
   name: string,
   email: string,
   password: string,
   confirmPassword: string
}) {
   try {
      const parsedCredentials = signUpSchema.safeParse({ name, email, password, confirmPassword });
      if (!parsedCredentials.success) return { success: false, message: "Invalid data." };

      // check if the email is already taken
      const existingUser = await prisma.user.findUnique({
         where: {
            email,
         },
      });

      if (existingUser) {
         return { success: false, message: "Email already exists. Login to continue." };
      }

      // hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);
      await prisma.user.create({
         data: {
            name,
            email,
            password: hashedPassword,
         },
      });

      return { success: true, message: "Account created successfully." };
   }
   catch (error) {
      console.error("Error creating account:", error);
      return { success: false, message: "An unexpected error occurred. Please try again." };
   }
}

