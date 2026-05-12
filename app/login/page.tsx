"use client";

import { useFormState } from "react-dom"; 
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { loginAction, type ActionState } from "@/app/actions/chat-actions";

const initialState: ActionState = { success: false, message: "" };

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-4xl">🥑</span>
          <h1 className="mt-2 text-2xl font-bold">Avocai</h1>
        </div>

        <form action={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
          {state.message && !state.success && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{state.message}</div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" className="w-full rounded-xl border p-2.5 outline-none focus:ring-2 focus:ring-green-100" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" className="w-full rounded-xl border p-2.5 outline-none focus:ring-2 focus:ring-green-100" />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-green-500 py-2.5 font-semibold text-white disabled:opacity-60"
          >
            {isPending ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}