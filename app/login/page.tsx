"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { loginAction, type ActionState } from "@/app/actions/chat-actions";

const initialState: ActionState = { success: false, message: "" };

/**
 * app/login/page.tsx — Halaman Login
 *
 * - Validasi email & password dengan Zod sebelum kirim ke server.
 * - Error ditampilkan per field.
 * - Redirect ke /dashboard setelah login sukses.
 */
export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  // Redirect otomatis setelah login berhasil
  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="w-full max-w-sm">

        {/* ── Logo / Brand ── */}
        <div className="mb-8 text-center">
          <span className="text-4xl">🥑</span>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Avocai</h1>
          <p className="mt-1 text-sm text-gray-500">Masuk ke akun kamu</p>
        </div>

        {/* ── Form Login ── */}
        <form action={formAction} className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          {/* Feedback global */}
          {state.message && !state.success && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {state.message}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="kamu@email.com"
              className={`
                w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
                focus:ring-2 focus:ring-green-100
                ${state.errors?.email ? "border-red-400" : "border-gray-200 focus:border-green-400"}
              `}
            />
            {state.errors?.email && (
              <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={`
                w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
                focus:ring-2 focus:ring-green-100
                ${state.errors?.password ? "border-red-400" : "border-gray-200 focus:border-green-400"}
              `}
            />
            {state.errors?.password && (
              <p className="mt-1 text-xs text-red-500">{state.errors.password[0]}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="
              w-full rounded-xl bg-green-500 py-2.5 text-sm font-semibold
              text-white transition hover:bg-green-600 active:scale-95
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {isPending ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          Belum punya akun?{" "}
          <a href="/register" className="font-medium text-green-600 hover:underline">
            Daftar sekarang
          </a>
        </p>
      </div>
    </div>
  );
}
