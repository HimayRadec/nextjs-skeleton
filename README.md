# Next.js Skeleton Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It includes styling with **shadcn/ui**, authentication via **Auth.js (NextAuth)**, and a **MongoDB** database adapter, with full support for server/client auth and Edge-compatible middleware.

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file at the root of the project and add:

```env
# MongoDB
MONGODB_URI=mongodb+srv://ExampleString:example@example.string.mongodb.net/ExampleString?retryWrites=true&w=majority&appName=NextJS_Skeleton
DATABASE_NAME=your-db-name

# Auth.js (Google OAuth)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Auth.js secret
AUTH_SECRET=your-random-auth-secret
```

To generate an Auth.js secret:

```bash
npx auth secret
```

### 3. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Setting Up Google OAuth

1. Go to [Google Cloud Console - Resource Manager](https://console.cloud.google.com/cloud-resource-manager)
2. Create a project and select it.
3. Go to **APIs & Services > OAuth consent screen** and set up the branding. ⚠️ **Add your authorized domain (e.g., localhost or production domain)**.
4. Go to **Credentials > Create Credentials > OAuth Client ID**:

   * **App Type**: Web
   * **Authorized JavaScript origins**: `http://localhost:3000`
   * **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

Paste the credentials into `.env.local`.

---

## 🧠 Auth.js Middleware vs Adapter (Edge Runtime Note)

This project separates **auth config** and **auth instance** for compatibility with middleware:

* `auth.config.ts`: Includes provider setup, routes (e.g., custom signin), and `authorized()` callback. ✅ **Safe for Edge runtime**
* `auth.ts`: Full `NextAuth()` instance with the MongoDB adapter and session strategy. ❌ **Not Edge-compatible** — avoid importing this in `middleware.ts`
* `middleware.ts`: Uses `NextAuth(authConfig)` only with the edge-safe `auth.config.ts` to avoid MongoDB adapter runtime errors.

This separation ensures:

* ✅ Secure route protection in middleware
* ✅ Full DB-powered sessions on the server

---

## ✍️ Creating a Custom Sign-In Page

Define your custom page at `app/signin/page.tsx`:

```tsx
'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  return (
    <Button onClick={() => signIn("google", { callbackUrl })}>
      Sign in with Google
    </Button>
  )
}
```

And in `auth.config.ts`, add:

```ts
pages: {
  signIn: "/signin",
}
```

---

## 🧩 Dependencies Used

* **Next.js 15** — App Router + Edge support
* **shadcn/ui** — Component and theme system
* **tailwindcss** — Utility-first styling
* **next-themes** — Theme toggling
* **Auth.js (NextAuth)** — Authentication
* **MongoDB + @auth/mongodb-adapter** — DB persistence
* **react-icons** — Optional icon support

---

## ✅ TODO

* [ ] Add form-based Credentials provider support
* [ ] Add Apple OAuth provider support
* [ ] Add role-based access controls (RBAC)
* [ ] Add unit tests for protected routes and auth
* [ ] Optional: Integrate Supabase or Neon for Postgres fallback

---

For more info, see:

* [Next.js Documentation](https://nextjs.org/docs)
* [Auth.js Docs](https://authjs.dev)
* [shadcn/ui Docs](https://ui.shadcn.com)
