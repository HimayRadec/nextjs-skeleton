This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To start the development server, run:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Learn More

Explore these resources to learn more about Next.js and related tools:

- [Next.js Documentation](https://nextjs.org/docs) — Features and API reference.
- [Learn Next.js](https://nextjs.org/learn) — Interactive Next.js tutorial.

## Dependencies

This project uses the following libraries:

- **shadcn/ui** 
   - [components.json documentation](https://ui.shadcn.com/docs/components-json)
   - [Themes](https://ui.shadcn.com/themes)
   - [Theming documentation](https://ui.shadcn.com/docs/theming)
- **next-themes** — Theme support for Next.js.
- **Auth.js** — Authentication for Next.js.
   - [MongoDB Adapter](https://authjs.dev/getting-started/adapters/mongodb)
- **MongoDB** - Database

---
Setting up authjs
1. run 'npx auth secret' 
2. add your mongo db to .env.local MONGODB_URI=mongodb+srv://HimayHue:qwertyui@radec.qwerty.mongodb.net/HimayHue?retryWrites=true&w=majority&appName=NextJS_Skeleton

Setting Up Google Auth
Go to this link https://console.cloud.google.com/cloud-resource-manager
Create a project
select that project
setup that branding. DONT FORGET TO ADD AN AUTHORIZED DOMAIN.

Then go to "clients" and create a client. 
The authorized javascript origins URI should be your domain you will run the application on. Like http://localhost:3000
The authorized redirect URIs should be that domain with /api/callback/google added at the end. For example http://localhost:3000/api/auth/callback/google 

Add these to your environment variables with the correct data from google oauth
AUTH_GOOGLE_ID={CLIENT_ID}
AUTH_GOOGLE_SECRET={CLIENT_SECRET}


You will also need a DB_NAME environment variable which will be where all the users in your mongodb uri will be stored. 
For example: DATABASE_NAME=HimayHue

TODO: Explain authjs and middleware and adapater with edge runtime. Also 