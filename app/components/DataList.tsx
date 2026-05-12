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

  if (optimisticItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4 grayscale opacity-40">📭</span>
        <h3 className="text-lg font-semibold text-gray-900">Belum ada data</h3>
        <p className="text-sm text-gray-500 mt-1">Sistem belum menerima pesan atau tiket baru.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {optimisticItems.map((item) => (
        <DataItem key={item.id} item={item} onRemove={() => removeOptimistic(item.id)} />
      ))}
    </div>
  );
}

function DataItem({ item, onRemove }: { item: ChatItem; onRemove: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (formData: FormData) => {
    onRemove(); // Optimistic update (instan)
    startTransition(async () => {
      await deleteChatAction({ success: false, message: "" }, formData);
    });
  };

  // Menentukan warna badge berdasarkan peran
  const roleColor = 
    item.peran.toLowerCase() === 'enterprise' ? 'bg-purple-100 text-purple-700 border-purple-200' :
    item.peran.toLowerCase() === 'distributor' ? 'bg-blue-100 text-blue-700 border-blue-200' :
    'bg-[#e9c46a]/20 text-[#8a6a00] border-[#e9c46a]/40';

  return (
    <div className={`relative flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:shadow-md ${isPending ? "opacity-40 scale-95" : ""}`}>
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium uppercase tracking-wider ${roleColor}`}>
            {item.peran}
          </span>
          <h3 className="mt-2 text-base font-bold text-gray-900 leading-tight">{item.nama_lengkap}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{item.email}</p>
        </div>
        
        {/* Tombol Hapus */}
        <form action={handleDelete}>
          <input type="hidden" name="id" value={item.id} />
          <button 
            type="submit" 
            disabled={isPending} 
            title="Hapus data"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-500 hover:text-white focus:outline-none"
          >
            {isPending ? "..." : (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
               </svg>
            )}
          </button>
        </form>
      </div>
      
      <div className="flex-1 rounded-xl bg-gray-50 p-3 border border-gray-100">
        <p className="text-sm text-gray-600 line-clamp-3 italic">"{item.pesan || "Tidak ada pesan"}"</p>
      </div>

      <div className="mt-4 flex items-center text-[11px] text-gray-400 font-medium">
        <svg className="mr-1 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
    </div>
  );
}