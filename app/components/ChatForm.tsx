"use client";

import { useActionState } from "react";
import { createChatAction, type ActionState } from "@/app/actions/chat-actions";

const initialState: ActionState = {
  success: false,
  message: "",
};

export default function ChatForm() {
  const [state, formAction, isPending] = useActionState(
    createChatAction,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Kirim Pesan Baru</h2>

      {/* ── Feedback global ── */}
      {state.message && !state.success && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.message}
        </div>
      )}
      {state.message && state.success && (
        <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          {state.message}
        </div>
      )}

      {/* ── Field: Nama Lengkap ── */}
      <div>
        <label htmlFor="nama_lengkap" className="mb-1 block text-sm font-medium text-gray-700">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nama_lengkap"
          name="nama_lengkap"
          placeholder="contoh: Budi Santoso"
          className={`
            w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
            focus:ring-2 focus:ring-green-100
            ${state.errors?.nama_lengkap ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-green-400"}
          `}
        />
        {state.errors?.nama_lengkap && (
          <p className="mt-1 text-xs text-red-500">{state.errors.nama_lengkap[0]}</p>
        )}
      </div>

      {/* ── Field: Email ── */}
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Alamat Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="budi@email.com"
          className={`
            w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
            focus:ring-2 focus:ring-green-100
            ${state.errors?.email ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-green-400"}
          `}
        />
        {state.errors?.email && (
          <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      {/* ── Field: Peran ── */}
      <div>
        <label htmlFor="peran" className="mb-1 block text-sm font-medium text-gray-700">
          Peran Anda <span className="text-red-500">*</span>
        </label>
        <select
          id="peran"
          name="peran"
          defaultValue=""
          className={`
            w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition
            focus:ring-2 focus:ring-green-100 bg-white
            ${state.errors?.peran ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-green-400"}
          `}
        >
          <option value="" disabled>-- Pilih peran --</option>
          <option value="Petani">Petani</option>
          <option value="Distributor">Distributor</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        {state.errors?.peran && (
          <p className="mt-1 text-xs text-red-500">{state.errors.peran[0]}</p>
        )}
      </div>

      {/* ── Field: Pesan ── */}
      <div>
        <label htmlFor="pesan" className="mb-1 block text-sm font-medium text-gray-700">
          Pesan <span className="font-normal text-gray-400">(opsional)</span>
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={4}
          placeholder="Tulis pesanmu di sini..."
          className={`
            w-full resize-none rounded-xl border px-4 py-2.5 text-sm outline-none transition
            focus:ring-2 focus:ring-green-100
            ${state.errors?.pesan ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-green-400"}
          `}
        />
        {state.errors?.pesan && (
          <p className="mt-1 text-xs text-red-500">{state.errors.pesan[0]}</p>
        )}
      </div>

      {/* ── Submit button ── */}
      <button
        type="submit"
        disabled={isPending}
        className="
          w-full rounded-xl bg-green-500 py-2.5 text-sm font-semibold
          text-white transition hover:bg-green-600 active:scale-95
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        {isPending ? "Memproses..." : "Kirim Pesan"}
      </button>
    </form>
  );
}