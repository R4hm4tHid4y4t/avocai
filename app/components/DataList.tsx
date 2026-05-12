"use client";

import { useOptimistic, useTransition } from "react";
import { deleteChatAction } from "@/app/actions/chat-actions";

export interface ChatItem {
  id: string;
  nama_lengkap: string;
  email: string;
  peran: string;
  pesan: string;
  created_at: string;
}

export default function DataList({ items }: { items: ChatItem[] }) {
  const [optimisticItems, removeOptimistic] = useOptimistic(
    items,
    (currentItems, deletedId) => currentItems.filter((item) => item.id !== deletedId)
  );

  return (
    <div className="space-y-3">
      {optimisticItems.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 py-12 text-center text-sm text-gray-500">
          Belum ada pesan.
        </div>
      )}
      {optimisticItems.map((item) => (
        <DataItem key={item.id} item={item} onRemove={() => removeOptimistic(item.id)} />
      ))}
    </div>
  );
}

function DataItem({ item, onRemove }: { item: ChatItem; onRemove: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (formData: FormData) => {
    onRemove();
    startTransition(async () => {
      await deleteChatAction({ success: false, message: "" }, formData);
    });
  };

  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition ${isPending ? "opacity-50" : ""}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{item.nama_lengkap}</h3>
          <p className="text-xs text-gray-500">{item.email} • {item.peran}</p>
        </div>
        <form action={handleDelete}>
          <input type="hidden" name="id" value={item.id} />
          <button 
            type="submit" 
            disabled={isPending} 
            aria-label={`Hapus pesan dari ${item.nama_lengkap}`}
            className="text-xs font-medium text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg"
          >
            {isPending ? "..." : "Hapus"}
          </button>
        </form>
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-3">{item.pesan}</p>
    </div>
  );
}