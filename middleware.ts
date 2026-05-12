import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware: Melindungi rute sensitif dari akses tanpa autentikasi.
 * Cek keberadaan session cookie; jika tidak ada, redirect ke /login.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ambil session cookie (nama cookie disesuaikan dengan implementasi auth kamu)
  const sessionCookie =
    request.cookies.get("sb-access-token") ??
    request.cookies.get("next-auth.session-token") ??
    request.cookies.get("session");

  const isAuthenticated = Boolean(sessionCookie?.value);

  if (!isAuthenticated) {
    // Simpan URL tujuan agar bisa redirect kembali setelah login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Config matcher: Daftar rute yang WAJIB dilindungi middleware.
 * Sesuaikan path ini dengan struktur folder app/ kamu.
 */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
