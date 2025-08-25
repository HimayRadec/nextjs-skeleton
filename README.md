# Next.js Skeleton Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It includes **shadcn/ui** for styling, **Auth.js (NextAuth)** for authentication, and **MongoDB with Prisma** for persistence.  
It’s designed with **App Router**, **Edge middleware compatibility**, and a clean developer workflow.

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/you/nextjs-skeleton.git
cd nextjs-skeleton
npm install
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
# MongoDB
DATABASE_URL=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/DATABASENAME?retryWrites=true&w=majority&appName=APPNAME

# Auth.js (Google OAuth)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Auth.js secret
AUTH_SECRET=your-random-auth-secret
```

Generate an Auth.js secret:

```bash
npx auth secret
```

### 3. Prisma Setup (MongoDB)

Run the following to sync the schema and generate the client:

```bash
npx prisma db push
npx prisma generate
```

(Optional) Open Prisma Studio to inspect your DB:

```bash
npx prisma studio
```

---

### 4. Run the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🔐 Setting Up Google OAuth (Optional for Local Dev)

1. Go to [Google Cloud Console](https://console.cloud.google.com/cloud-resource-manager) and create/select a project.
2. Configure **OAuth consent screen** (set branding + add authorized domains).
3. Under **Credentials → Create Credentials → OAuth Client ID**:
   - **App Type**: Web  
   - **Authorized JavaScript origins**: `http://localhost:3000`  
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
4. Copy credentials into `.env`.

---

## Auth.js Advanced Notes (Edge Runtime & Middleware)

This repo separates config to support middleware safely:

- `auth.config.ts`: Providers, routes, and `authorized()` callback. ✅ Edge-compatible  
- `auth.ts`: Full `NextAuth()` instance with Prisma adapter. ❌ Not Edge-compatible  
- `middleware.ts`: Uses `NextAuth(authConfig)` only, to stay safe in Edge runtime.

This ensures:

- ✅ Secure route protection in middleware  
- ✅ Full DB-backed sessions on the server  

---

## ✅ Features

- 🔐 Google OAuth login  
- 🗝️ Credentials login with bcrypt hashing  
- 🧠 Session-based user state  
- 👤 Users auto-assigned random usernames (with 30-day cooldown on changes)  
- 🔎 Middleware-protected routes with role-based access  
- 🎨 Theme support via `shadcn/ui` + `next-themes`  

---

## 📉 Dependencies

### Core
- **Next.js 15** — App Router + Edge  
- **tailwindcss** — Utility-first styling  
- **shadcn/ui** — Component system  
- **Auth.js (NextAuth)** — Authentication  
- **Prisma + MongoDB** — Persistence  

### Enhancements
- **next-themes** — Theme toggling  
- **zod** — Schema validation  
- **react-icons** — Optional icon support  

---

## 🔤 Naming Conventions

- `kebab-case`: files & folders (`set-username.ts`)  
- `PascalCase`: React components (`LoginForm.tsx`)  
- `camelCase`: vars & functions (`getUserData`)  

> Based on [Next.js naming conventions](https://dev.to/vikasparmar/nextjs-component-naming-conventions-best-practices-for-file-and-component-names-39o2).

---

## 📦 Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org):

```bash
type(scope?): action
```

### Common Types
- `feat`, `fix`, `refactor`, `docs`, `test`, `style`, `chore`, `ci`, `build`, `perf`, `revert`

### Examples
```bash
feat(auth): add Google OAuth login
fix(ui): correct theme toggle in dark mode
```

---

## 📙 References

- [Next.js Docs](https://nextjs.org/docs)  
- [Auth.js Docs](https://authjs.dev)  
- [shadcn/ui Docs](https://ui.shadcn.com)  
- [Prisma Docs](https://www.prisma.io/docs)  
