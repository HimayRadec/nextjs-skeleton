import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { emailSignInSchema } from "./lib/zod";
import prisma from "./lib/prisma";

import bcryptjs from "bcryptjs";
import { NextAuthConfig } from "next-auth";


const authRoutes = ["/auth/signin", "/auth/signup"];
const setUsernameRoute = "/set-username";

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
            const parsedCredentials = emailSignInSchema.safeParse(credentials);
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
         const usernameIsNotSet = !auth?.user.username;

         const { pathname } = nextUrl;

         // Redirect to the dashboard if logged in and trying to access the signin or sign up page
         if (userIsLoggedIn && authRoutes.includes(pathname)) return Response.redirect(new URL('/dashboard', nextUrl));

         // Redirect to set username page if user is logged in but username is missing
         if (userIsLoggedIn && usernameIsNotSet) return Response.redirect(new URL(setUsernameRoute, nextUrl));

         // Redirect to signin page if user is not logged in and trying to access the set username page
         if (!userIsLoggedIn && pathname === setUsernameRoute) return Response.redirect(new URL('/auth/signin', nextUrl));

         // Limit access to admin routes to admin users only
         if (pathname.startsWith('/admin') && role !== 'admin') return Response.redirect(new URL('/dashboard', nextUrl));
         return userIsLoggedIn
      },

      jwt({ token, user, trigger, session }) {
         if (user) {
            token.id = user.id as string;
            token.username = user.username as string;
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
   debug: true,
} satisfies NextAuthConfig

export default config
