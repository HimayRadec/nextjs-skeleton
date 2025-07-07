"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";



// TODO: extract the success messages to a constant
export async function updateUsername(username: string) {

   const session = await auth();

   if (!session?.user?.id) {
      return { success: false, message: "Unauthorized." };
   }

   const normalizedUsername = username.trim().toLowerCase();

   const existingUser = await prisma.user.findFirst({
      where: { username: normalizedUsername },
   });

   if (existingUser) return { success: false, message: "Username already exists." };

   await prisma.user.update({
      where: { id: session.user.id },
      data: { username: normalizedUsername },
   });

   return { success: true, message: "Username updated successfully." };
}


