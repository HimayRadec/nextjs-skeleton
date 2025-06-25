import Image from "next/image";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
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
        <h1 className="text-3xl font-bold text-center">
          Next.js 15 Skeleton
        </h1>
        <p className="text-center text-base text-muted-foreground">
          A modern starter template featuring Next.js 15, Auth.js for authentication, next-themes for dark mode, shadcn/ui for beautiful components, and MongoDB for persistent storage.
        </p>
        <ul className="list-disc list-inside text-left text-sm space-y-2">
          <li>
            <span className="font-semibold">Next.js 15</span> – App Router, Server Components, and more.
          </li>
          <li>
            <span className="font-semibold">Auth.js</span> – Secure, flexible authentication.
          </li>
          <li>
            <span className="font-semibold">next-themes</span> – Seamless dark/light mode.
          </li>
          <li>
            <span className="font-semibold">shadcn/ui</span> – Accessible, customizable UI components.
          </li>
          <li>
            <span className="font-semibold">MongoDB</span> – Scalable NoSQL database integration.
          </li>
        </ul>
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
      </main>
      <footer className="mt-12 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Next.js 15 Skeleton. Built with love.
      </footer>
    </div>
  );
}
