// middleware.js
// Task 1: Keamanan — Proteksi rute /dashboard dengan session cookie

import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("avocai-session");

  // Jika tidak ada session cookie → redirect ke halaman login
  if (!session || session.value !== "authenticated") {
    const loginUrl = new URL("/login", request.url);
    // Simpan URL tujuan agar bisa redirect balik setelah login
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Hanya lindungi rute /dashboard dan semua sub-rutenya
export const config = {
  matcher: ["/dashboard/:path*"],
};