// types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
   interface User {
      id: string
      username?: string
      role: string
   }
   interface Session {
      user: User
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      id: string
      username?: string
      role: string
   }
}