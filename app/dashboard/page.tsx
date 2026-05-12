/**
 * app/dashboard/page.tsx — Halaman Dashboard (Server Component)
 *
 * Menggabungkan semua fitur Tugas Minggu 9:
 *  ✅ Task 1: Rute ini dilindungi middleware (tidak bisa akses tanpa login)
 *  ✅ Task 2: Data difilter dari Supabase berdasarkan search query
 *  ✅ Task 3: Search query diambil dari URL (source of truth)
 *  ✅ Task 4: Skeleton UI aktif otomatis via loading.tsx
 */

import { Suspense } from "react";
import { createClient } from "@/app/lib/supabase/server";
import SearchBar from "@/app/components/SearchBar";
import DataList, { type ChatItem } from "@/app/components/DataList";
import ChatForm from "@/app/components/ChatForm";
import DashboardLoading from "./loading";

interface DashboardPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  // Resolve searchParams (async di Next.js 15)
  const { q: query = "" } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Kelola data chat AI kamu</p>
          </div>
        </div>

        {/* ── Search Bar (Task 3: URL as State) ──────────────────── */}
        <div className="mb-6">
          <SearchBar placeholder="Cari berdasarkan judul..." />
          {query && (
            <p className="mt-2 text-xs text-gray-400">
              Menampilkan hasil untuk: <strong className="text-gray-600">"{query}"</strong>
            </p>
          )}
        </div>

        {/* ── Layout dua kolom ───────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Kolom kiri: form tambah data */}
          <div className="lg:col-span-1">
            <ChatForm />
          </div>

          {/* Kolom kanan: list data dengan Optimistic UI */}
          <div className="lg:col-span-2">
            {/* 
              Suspense memicu loading.tsx saat data di-stream.
              fallback manual di sini jika ingin kontrol lebih.
            */}
            <Suspense fallback={<DashboardLoading />}>
              <ChatDataSection query={query} />
            </Suspense>
          </div>

        </div>
      </div>
    </div>
  );
}

// ── Server Component: fetch data dari Supabase ────────────────────────────

async function ChatDataSection({ query }: { query: string }) {
  const supabase = await createClient();

  // Bangun query Supabase secara dinamis
  let dbQuery = supabase
    .from("chats") // 🔄 Ganti dengan nama tabel kamu
    .select("id, title, message, created_at")
    .order("created_at", { ascending: false });

  // Filter berdasarkan search query dari URL (Task 3)
  if (query) {
    dbQuery = dbQuery.ilike("title", `%${query}%`);
  }

  const { data, error } = await dbQuery;

  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 px-6 py-4 text-sm text-red-600">
        Gagal memuat data: {error.message}
      </div>
    );
  }

  // DataList menerima data dan menangani Optimistic UI (Task 4)
  return <DataList items={(data as ChatItem[]) ?? []} />;
}
