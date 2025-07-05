import Image from "next/image";
import { auth } from "@/auth";
import { Session } from "next-auth";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { SignOutButton } from "@/components/signout-button";

export default async function DashboardPage() {
   const session = await auth();
   console.log(`[DASHBOARD SESSION]: ${JSON.stringify(session, null, 2)}`);

   return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground">
         <main className="flex flex-col items-center gap-8 max-w-xl w-full">
            <DisplaySession session={session} />
         </main>
      </div>
   );
}

function DisplaySession({ session }: { session: Session | null }) {
   if (!session) {
      return <div>Not authenticated</div>
   }

   return (
      <Card className="w-full min-w-fit">
         <CardHeader>
            <CardTitle className="text-center">Welcome, {session.user?.name || "User"}!</CardTitle>
            <CardDescription className="text-center">Email: {session.user?.email}</CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col items-center">
            {session.user?.image && (
               <Image
                  src={session.user.image}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="rounded-full border"
               />
            )}
            {/* Display the session object */}
            <pre className="w-full pt-2">
               {JSON.stringify(session, null, 2)
                  .replace(/[{}"]/g, "") // remove braces/quotes
                  .trim()}
            </pre>
         </CardContent>
         <CardFooter className="justify-center">
            <SignOutButton />
         </CardFooter>
      </Card>
   );
}