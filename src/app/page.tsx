import Image from "next/image";

import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignInButton } from "@/components/signin-button";
import { SignOutButton } from "@/components/signout-button";

import { auth } from "@/auth"
import { Session } from "next-auth";

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground">
      <main className="flex flex-col items-center gap-8 max-w-xl w-full">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={120}
          height={26}
          className="dark:invert"
          priority
        />
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-3xl font-bold text-center">
                Next.js 15 Skeleton
              </h1>
            </CardTitle>
            <CardDescription>
              <p className="text-center text-base text-muted-foreground">
                A modern starter template featuring Next.js 15, Auth.js for authentication, next-themes for dark mode, shadcn/ui for beautiful components, and MongoDB for persistent storage.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside text-left text-sm space-y-2">
              <li>
                <span className="font-semibold">
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    Next.js 15
                  </a>
                </span>
                – App Router, Server Components, and more.
              </li>
              <li>
                <span className="font-semibold">
                  <a
                    href="https://authjs.dev/getting-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    Auth.js
                  </a>
                </span>
                – Secure, flexible authentication.
              </li>
              <li>
                <span className="font-semibold">
                  <a
                    href="https://github.com/pacocoursey/next-themes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    next-themes
                  </a>
                </span>
                – Seamless dark/light mode.
              </li>
              <li>
                <span className="font-semibold">
                  <a
                    href="https://ui.shadcn.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    shadcn/ui
                  </a>
                </span>
                – Accessible, customizable UI components.
              </li>
              <li>
                <span className="font-semibold">
                  <a
                    href="https://www.mongodb.com/docs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary"
                  >
                    MongoDB
                  </a>
                </span>
                – Scalable NoSQL database integration.
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <div className="flex gap-4 mt-6 items-center">
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                View on GitHub
              </a>
              <ModeToggle />
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-md border border-input hover:bg-accent transition"
              >
                Next.js Docs
              </a>
            </div>
          </CardFooter>
        </Card>

      </main>
      <footer className="mt-12 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Next.js 15 Skeleton. Crafted with attention to detail.
      </footer>
    </div>
  );
}


/**
 * Renders authentication session UI based on the user's session state.
 *
 * @param session - The current authentication session, or `null` if the user is not logged in.
 * @returns A React fragment displaying a welcome message and sign-out button if authenticated,
 *          or a prompt to sign in if not authenticated.
 *
 * @remarks
 * - Expects a `Session` object with a `user` property containing user details.
 * - Uses `SignInButton` and `SignOutButton` components to handle authentication actions.
 */
function AuthSession({ session }: { session: Session | null }) {
  return (
    <>
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <p>Welcome, {session.user?.name}!</p>
          <SignOutButton />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p>Not Logged In</p>
          <SignInButton />
        </div>
      )}
    </>
  )
}
