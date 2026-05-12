// app/login/actions.js
// Server Action: Login & Logout

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Kredensial admin (simulasi — di produksi gunakan database)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "avocai2026";

export async function login(prevState, formData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  // Validasi input kosong
  if (!username || !password) {
    return { success: false, message: "Username dan password wajib diisi." };
  }

  // Cek kredensial
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return { success: false, message: "Username atau password salah." };
  }

  // Set session cookie
  cookies().set("avocai-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 jam
    path: "/",
    sameSite: "lax",
  });

  redirect("/dashboard");
}

export async function logout() {
  cookies().delete("avocai-session");
  redirect("/login");
}