"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { loginAction } from "@/app/actions/chat-actions";
import Link from "next/link";

const initialState = { success: false, message: "", errors: {} };

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f0e8] px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a3a2a] shadow-lg">
            <span className="text-3xl">🥑</span>
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-[#1a3a2a] font-judul">
            Avoc<span className="text-[#52b788]">AI</span> Workspace
          </h2>
          <p className="mt-2 text-sm text-[#5a6e61]">
            Silakan masuk ke akun enterprise Anda
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 rounded-3xl bg-white px-8 py-10 shadow-2xl sm:px-10 border border-[#ede5d4]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Notifikasi Error Global */}
            {state.message && !state.success && (
              <div className="rounded-xl bg-red-50 p-4 border border-red-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{state.message}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1a3a2a]">Alamat Email</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@avocai.id"
                  className={`block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${state.errors?.email ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-[#52b788]'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none transition-all`}
                />
                {state.errors?.email && <p className="mt-2 text-sm text-red-600">{state.errors.email[0]}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1a3a2a]">Password</label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${state.errors?.password ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-[#52b788]'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none transition-all`}
                />
                {state.errors?.password && <p className="mt-2 text-sm text-red-600">{state.errors.password[0]}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className="flex w-full justify-center rounded-xl bg-[#1a3a2a] px-3 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2d6a4f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a3a2a] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    Mengautentikasi...
                  </span>
                ) : "Masuk ke Dashboard"}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-[#5a6e61]">
          Belum memiliki akses?{' '}
          <Link href="/contact" className="font-semibold text-[#2d6a4f] hover:text-[#1a3a2a] transition-colors">
            Hubungi Tim Sales Kami
          </Link>
        </p>
      </div>
    </div>
  );
}