"use server";

import { signIn, signOut, auth } from "@/auth";
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

export async function handleUsernameUpdate({ username }: { username: string }) {
   try {
      const session = await auth();

      if (!session || !session.user || !session.user.id) {
         return { success: false, message: "Unauthorized." };
      }

      const userId = session.user.id;

      // Check if the username is already taken
      const existingUser = await prisma.user.findUnique({
         where: { username },
      });

      if (existingUser) {
         return { success: false, message: "Username already exists." };
      }

      // Update the user's username
      await prisma.user.update({
         where: { id: userId },
         data: { username },
      });

      return { success: true, message: "Username updated successfully." };
   } catch (error) {
      console.error("Error updating username:", error);
      return { success: false, message: "An unexpected error occurred. Please try again." };
   }
}
