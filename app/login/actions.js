"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "avocai2026";

export async function login(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, message: "Email dan password wajib diisi." };
  }

  // Mengizinkan format "admin" atau email lengkap untuk kemudahan tester
  if ((email !== ADMIN_USERNAME && email !== "admin@avocai.id") || password !== ADMIN_PASSWORD) {
    return { success: false, message: "Kredensial tidak valid. Silakan coba lagi." };
  }

  cookies().set("avocai-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  });

  redirect("/dashboard");
}

export async function register(prevState, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { success: false, message: "Lengkapi semua data pendaftaran." };
  }

  // Auto-login setelah register
  cookies().set("avocai-session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  });

  redirect("/dashboard");
}

export async function logout() {
  cookies().delete("avocai-session");
  redirect("/login");
}