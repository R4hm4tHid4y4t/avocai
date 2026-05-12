"use client";

import { useOptimistic, useTransition } from "react";
import { useFormState } from "react-dom";
import { deleteChatAction, type ActionState } from "@/app/actions/chat-actions";

export interface ChatItem {
  id: string;
  nama_lengkap: string;
  email: string;
  peran: string;
  pesan: string;
  created_at: string;
}

interface DataListProps {
  items: ChatItem[];
}

const initialState: ActionState = { success: false, message: "" };

export default function DataList({ items }: DataListProps) {
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

function ChatCard({ item, onDelete }: { item: ChatItem; onDelete: () => void; }) {
  const [, formAction] = useFormState(deleteChatAction, initialState);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (formData: FormData) => {
    onDelete();
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition ${isPending ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}>
      <div className="mb-2 flex items-start justify-between gap-4">
        <div>
          <span className="inline-block rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 mb-1">
            {item.peran}
          </span>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {item.nama_lengkap}
          </h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>

        <form action={handleDelete}>
          <input type="hidden" name="id" value={item.id} />
          <button
            type="submit"
            disabled={isPending}
            className="flex-shrink-0 rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed"
          >
            {isPending ? "Menghapus..." : "Hapus"}
          </button>
        </form>
      </div>

      <p className="text-xs text-gray-600 line-clamp-2 mt-2 italic">"{item.pesan}"</p>

      <p className="mt-3 text-[11px] text-gray-400 font-medium">
        {new Date(item.created_at).toLocaleDateString("id-ID", {
          day: "numeric", month: "short", year: "numeric",
        })}
      </p>
    </div>
  );
}