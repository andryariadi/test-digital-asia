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
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
