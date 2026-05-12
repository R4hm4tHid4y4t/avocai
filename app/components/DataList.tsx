"use client";

import { useOptimistic, useActionState, useTransition } from "react";
import { deleteChatAction, type ActionState } from "@/app/actions/chat-actions";

// ─────────────────────────────────────────────
// Type: sesuaikan dengan kolom tabel Supabase
// ─────────────────────────────────────────────

export interface ChatItem {
  id: string;
  title: string;
  message: string;
  created_at: string;
}

interface DataListProps {
  items: ChatItem[];
}

const initialState: ActionState = { success: false, message: "" };

/**
 * DataList — Daftar data dengan Optimistic UI pada fitur hapus.
 *
 * - Item langsung hilang dari UI saat tombol hapus diklik.
 * - Server Action berjalan di background.
 * - Jika gagal, item muncul kembali secara otomatis.
 */
export default function DataList({ items }: DataListProps) {
  // useOptimistic: versi "optimis" dari list
  const [optimisticItems, removeOptimistic] = useOptimistic(
    items,
    (currentItems: ChatItem[], deletedId: string) =>
      currentItems.filter((item) => item.id !== deletedId)
  );

  return (
    <div className="space-y-3">
      {optimisticItems.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-400">
          Belum ada data. Silakan tambahkan data baru.
        </div>
      )}

      {optimisticItems.map((item) => (
        <ChatCard
          key={item.id}
          item={item}
          onDelete={() => removeOptimistic(item.id)}
        />
      ))}
    </div>
  );
}

// ── Sub-komponen: satu kartu data ────────────────────────────────────────────

function ChatCard({
  item,
  onDelete,
}: {
  item: ChatItem;
  onDelete: () => void;
}) {
  const [, formAction, isPending] = useActionState(
    deleteChatAction,
    initialState
  );
  const [, startTransition] = useTransition();

  const handleDelete = (formData: FormData) => {
    // 1. Update UI secara optimis (instan)
    onDelete();
    // 2. Jalankan Server Action di background
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div
      className={`
        rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition
        ${isPending ? "opacity-50 scale-95" : "opacity-100 scale-100"}
      `}
    >
      <div className="mb-2 flex items-start justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
          {item.title}
        </h3>

        {/* ── Form hapus (membawa ID data) ── */}
        <form action={handleDelete}>
          <input type="hidden" name="id" value={item.id} />
          <button
            type="submit"
            disabled={isPending}
            className="
              flex-shrink-0 rounded-lg bg-red-50 px-3 py-1 text-xs
              font-medium text-red-500 transition hover:bg-red-100
              disabled:cursor-not-allowed
            "
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </button>
        </form>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2">{item.message}</p>

      <p className="mt-3 text-xs text-gray-400">
        {new Date(item.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}
