# Next.js Skeleton Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It includes styling with **shadcn/ui**, authentication via **Auth.js (NextAuth)**, and a **MongoDB** database using **Prisma**, with full support for server/client auth and Edge-compatible middleware.

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file at the root of the project and add:

```env
# MongoDB
DATABASE_URL=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/DATABASENAME?retryWrites=true&w=majority&appName=APPNAME

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

Paste the credentials into `.env`.

---

## 🨠 Auth.js Middleware vs Adapter (Edge Runtime Note)

This project separates **auth config** and **auth instance** for compatibility with middleware:

* `auth.config.ts`: Includes provider setup, routes (e.g., custom signin), and `authorized()` callback. ✅ **Safe for Edge runtime**
* `auth.ts`: Full `NextAuth()` instance with the Prisma MongoDB adapter and session strategy. ❌ **Not Edge-compatible** — avoid importing this in `middleware.ts`
* `middleware.ts`: Uses `NextAuth(authConfig)` only with the edge-safe `auth.config.ts` to avoid runtime errors.

This separation ensures:

* ✅ Secure route protection in middleware
* ✅ Full DB-powered sessions on the server

---

## 🧹 Prisma Setup (MongoDB)

This project uses Prisma with MongoDB as its adapter. Key commands:

```bash
# Apply schema changes to MongoDB
npx prisma db push

# Generate the Prisma Client
npx prisma generate

# Open the Prisma GUI (Prisma Studio)
npx prisma studio
```

If you delete documents manually from MongoDB Atlas, no additional syncing is needed unless you're altering your schema — in which case, rerun:

```bash
npx prisma db push
```

> Be sure your schema contains the correct `DATABASE_URL` in `.env`

```env
DATABASE_URL="mongodb+srv://USER:PASSWORD@cluster.mongodb.net/DATABASENAME?retryWrites=true&w=majority&appName=APPNAME"
```

---

## 📉 Dependencies Used

* **Next.js 15** — App Router + Edge support
* **shadcn/ui** — Component and theme system
* **tailwindcss** — Utility-first styling
* **next-themes** — Theme toggling
* **Auth.js (NextAuth)** — Authentication
* **Prisma + MongoDB** — DB persistence with `@prisma/client` and `@prisma/adapter-mongodb`
* **zod** — Schema validation for forms
* **react-icons** — Optional icon support

---

## ✅ Features

* 🔐 Google OAuth login
* 🨠 Credentials-based login with bcrypt password hashing
* 🧠 Session-based user state
* 👤 Users are automatically assigned a random username on first sign-in
* 🔄 Users can update their username with a **30-day cooldown**
* 🔎 Middleware-protected routes with role-based support
* 🎨 Theme support with `shadcn/ui` and `next-themes`

---

## 🔤 Naming Conventions

* `kebab-case`: file and folder names (e.g., `set-username.ts`)
* `PascalCase`: React components (e.g., `LoginForm.tsx`)
* `camelCase`: variables, functions, and data properties

> Based on [Next.js naming convention practices](https://dev.to/vikasparmar/nextjs-component-naming-conventions-best-practices-for-file-and-component-names-39o2)

---

## 📦 Commit Message Format

```bash
type(scope?): Action
```

### Common Types

- `build`
- `chore`
- `ci`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `revert`
- `style`
- `test`

### Examples

```bash
chore: ran tests on travis ci
feat(blog): Added a comment section
```

---

## 📙 References

* [Next.js Documentation](https://nextjs.org/docs)
* [Auth.js Docs](https://authjs.dev)
* [shadcn/ui Docs](https://ui.shadcn.com)
* [Prisma Docs](https://www.prisma.io/docs)
* [Conventional Commits](https://www.conventionalcommits.org)
