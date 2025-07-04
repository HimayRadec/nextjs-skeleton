import { GoogleSignInButton } from "@/components/signin-button";

export default function SignInPage() {
   return (
      <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
         <GoogleSignInButton />
      </main>
   );
}