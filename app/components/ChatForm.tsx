"use client";

import { useFormState } from "react-dom";
import { useTransition } from "react";
import { createChatAction, type ActionState } from "@/app/actions/chat-actions";

const initialState: ActionState = {
  success: false,
  message: "",
};

export default function ChatForm() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useFormState(createChatAction, initialState);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form action={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Kirim Pesan Baru</h2>

      {state.message && (
        <div className={`rounded-lg px-4 py-3 text-sm ${state.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
          {state.message}
        </div>
      )}

      {/* Nama Lengkap */}
      <div>
        <label htmlFor="nama_lengkap" className="mb-1 block text-sm font-medium text-gray-700">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="nama_lengkap"
          name="nama_lengkap"
          placeholder="Masukkan nama lengkap"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-100"
        />
        {state.errors?.nama_lengkap && <p className="mt-1 text-xs text-red-500">{state.errors.nama_lengkap[0]}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="chat_email" className="mb-1 block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="chat_email"
          name="email"
          placeholder="nama@email.com"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-100"
        />
        {state.errors?.email && <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>}
      </div>

      {/* Peran */}
      <div>
        <label htmlFor="peran" className="mb-1 block text-sm font-medium text-gray-700">
          Peran <span className="text-red-500">*</span>
        </label>
        <select
          id="peran"
          name="peran"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-100 bg-white"
        >
          <option value="">Pilih Peran</option>
          <option value="Petani">Petani</option>
          <option value="Distributor">Distributor</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        {state.errors?.peran && <p className="mt-1 text-xs text-red-500">{state.errors.peran[0]}</p>}
      </div>

      {/* Pesan */}
      <div>
        <label htmlFor="pesan" className="mb-1 block text-sm font-medium text-gray-700">
          Pesan
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={4}
          placeholder="Tulis pesan Anda..."
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-100"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-green-500 py-2.5 font-semibold text-white disabled:opacity-60 transition active:scale-95"
      >
        {isPending ? "Memproses..." : "Kirim Pesan"}
      </button>
    </form>
  );
}