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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
const token = request.cookies.get("accessToken")?.value;
const { pathname } = request.nextUrl;

// Jika mencoba mengakses route protected tanpa login
if (!token && (pathname.startsWith("/") || pathname.startsWith("/dashboard"))) {
return NextResponse.redirect(new URL("/login", request.url));
}

// Jika sudah login tapi mencoba akses auth page
if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
return NextResponse.redirect(new URL(token === "Admin" ? "/dashboard" : "/", request.url));
}

// Role-based redirect
if (token) {
const role = request.cookies.get("role")?.value;

    if (role === "User" && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (role === "Admin" && pathname.startsWith("/")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

}

return NextResponse.next();
}

export const config = {
matcher: ["/((?!\_next|[^?]_\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest))._)", "/(api|trpc)(.\*)"],
};

 <div className="b-amber-500">
        {/* Top */}
        <div className="b-rose-500 rounded-t-md overflow-hidden">
          {/* Total Articles */}
          <div className="bg-white p-6 border-b-2 border-slate-200">
            <span>Total Articles: {articlesLength}</span>
          </div>

          {/* Action Button */}
          <div className="bg-white p-6 flex items-center justify-between border-b-2 border-slate-200">
            {/* Filter & Search */}
            <div className="b-rose-600 flex items-center gap-2">
              <FilterCategory caategories={categories} isAdmin={true} />

              <SearchArticles query={query} action="/dashboard-articles" isAdmin={true} isArticle={true} />
            </div>

            {/* Button Create */}
            {/* <div className="bg-purple-600"> */}
            <button className="flex items-center gap-2 py-3 px-4 w-max bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300" type="submit">
              <Plus size={20} className="text-slate-50" />
              <span className="text-sm text-slate-50 font-medium">Add Articles</span>
            </button>
            {/* </div> */}
          </div>
        </div>

        {/* Table */}
        <div className="b-rose-600">
          <ArticlesTable articles={articles} />
        </div>
      </div>
