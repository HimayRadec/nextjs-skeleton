import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/zod";
import prisma from "./lib/prisma";

import bcryptjs from "bcryptjs";
import { NextAuthConfig } from "next-auth";


const authRoutes = ["/auth/signin", "/auth/signup"];

const config = {
   pages: {
      signIn: "/auth/signin",
   },
   providers: [
      Google({
         // This automatically links Google accounts with existing accounts that have the same email address.
         // allowDangerousEmailAccountLinking: true, 
      }),
      Credentials({
         credentials: {
            //TODO: Add a username field
            email: { label: "Email", type: "email", placeholder: "Email" },
            password: { label: "Password", type: "password", placeholder: "Password" },
         },
         async authorize(credentials) {
            let user = null;

            // validate credentials
            const parsedCredentials = signInSchema.safeParse(credentials);
            if (!parsedCredentials.success) {
               console.error("Invalid credentials:", parsedCredentials.error.errors);
               return null;
            }
            // get user

            user = await prisma.user.findUnique({
               where: {
                  email: credentials.email as string,
               },
            });

            if (!user) {
               console.log("Invalid credentials");
               return null;
            }

            if (!user.password) {
               console.log("User has no password. They probably signed up with an oauth provider.");
               return null;
            }

            const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password);
            if (!isPasswordValid) {
               console.log("Invalid password");
               return null;
            }

            return {
               id: user.id,
               username: user.username ?? "Username not set",
               role: user.role,
            }

         }
      })
   ],
   callbacks: {
      authorized({ request: { nextUrl }, auth }) {
         // Only allow access if logged in
         const userIsLoggedIn = !!auth?.user;
         const role = auth?.user.role || 'user';

         const { pathname } = nextUrl;

         // Redirect to the dashboard if logged in and trying to access the signin page
         if (authRoutes.includes(pathname) && userIsLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));

         // Limit access to admin routes to admin users only
         if (pathname.startsWith('/admin') && role !== 'admin') return Response.redirect(new URL('/dashboard', nextUrl));
         return userIsLoggedIn
      },

      jwt({ token, user, trigger, session }) {
         if (user) {
            token.id = user.id as string;
            token.username = user.username as string || "NOTSET"; //TODO: Remove this once the random username generation is implemented
            token.role = user.role as string;
         }
         if (trigger === "update" && session) {
            token = { ...token, ...session };
         }
         return token;
      },

      session({ session, token }) {
         session.user.id = token.id;
         session.user.username = token.username;
         session.user.role = token.role;

         console.log(`[AUTHJS SESSION]: ${JSON.stringify(session, null, 2)}\n`);
         return session;
      }


   },
} satisfies NextAuthConfig

export default config
