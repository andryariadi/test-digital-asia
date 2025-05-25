import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/", "/user/profile", "/dashboard-articles", "/dashboard-category"];
const adminRoutes = ["/dashboard-articles", "/dashboard-category"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  // Jika user sudah login dan mencoba mengakses auth routes
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(role === "Admin" ? "/dashboard-articles" : "/", request.url));
  }

  // Jika user belum login dan mencoba mengakses protected routes
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect berdasarkan role
  if (token) {
    if (role === "Admin" && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard-articles", request.url));
    }
    if (role === "User" && adminRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
