npx create-next-app@latest active-recall-app

cd active-recall-app
npm run dev

src/app/
├── add-learning/
│   └── page.tsx
├── recall/
│   └── page.tsx
├── library/
│   └── page.tsx
├── dashboard/    // optional
│   └── page.tsx


npm install prisma @prisma/client
npx prisma init

download postgresSQL from its website
password:23052911
port:5432


DATABASE_URL="postgresql://postgres:23052911@localhost:5432/active_recall"

//create the required tables in database
npx prisma migrate dev --name init


You can now visually inspect your DB:


//Opens a local web UI at http://localhost:5555 where you can view/edit data in Learning.
npx prisma studio


//If you’ve recently added new fields or models, ensure you’ve run the migrations properly:
npx prisma migrate dev --name add-learning-fields


Run the migration to apply any changes to your database:

bash
npx prisma migrate dev
Generate the Prisma Client (if needed):

bash
npx prisma generate
Restart your development server to ensure everything is in sync:

bash
npm run dev


3. Backend Code Update (Handle Image as Required)
In your backend API (route.ts), you will need to handle the form data containing the image properly. Since you are using FormData on the frontend, you should be handling file uploads in the backend using formidable or next-connect.

Here’s an updated version of the backend code to handle image uploads:

Install formidable for file uploads:
npm install formidable


debugging the prisma and postgresql 
use hard coding the things for debugging


npx prisma migrate reset




1. Install next-pwa
Run this in your terminal:

bash
Copy
Edit
npm install next-pwa
2. Update next.config.js
If you're using the App Router, do this:

js
Copy
Edit
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  // your existing Next.js config
};

module.exports = withPWA(nextConfig);
3. Create public/manifest.json
This file describes your app when it's "installed":

json
Copy
Edit
{
  "name": "Active Recall App",
  "short_name": "Recall",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0f172a",
  "description": "A minimal active recall app with spaced repetition.",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
You can generate icons here: https://realfavicongenerator.net/

Put your icons in: public/icons/
5. Build Your App
bash
Copy
Edit
npm run build
This will generate a service-worker.js in public/.

6. Test PWA Features
Run the production build:

bash
Copy
Edit
npm start
Open your app in Chrome

Open DevTools → Application → Manifest / Service Worker

You should see:

"Install" icon in browser address bar

Offline functionality (try turning off Wi-Fi!)












































































This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

