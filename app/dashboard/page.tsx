import { Suspense } from "react";
import { createClient } from "@/app/lib/supabase/server";
import SearchBar from "@/app/components/SearchBar";
import DataList, { type ChatItem } from "@/app/components/DataList";
import ChatForm from "@/app/components/ChatForm";
import DashboardLoading from "./loading";

interface DashboardPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { q: query = "" } = await searchParams;

  return (
    <div className="min-h-screen bg-[#f5f0e8] font-sans pb-12">
      {/* Topbar Profesional */}
      <header className="bg-white shadow-sm border-b border-[#ede5d4]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a3a2a] text-xl">🥑</div>
             <h1 className="text-xl font-bold text-[#1a3a2a] font-judul">AvocAI Control Center</h1>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-[#5a6e61] bg-[#ede5d4] px-3 py-1.5 rounded-full">Admin System</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Header Section */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Manajemen Data Tiket & Kemitraan
            </h2>
            <p className="mt-2 text-sm text-gray-500">Kelola pesan masuk dari petani, distributor, dan enterprise.</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none w-full sm:w-auto">
            <SearchBar placeholder="Cari nama pengirim..." />
          </div>
        </div>

        {/* Layout Grid Modern */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Kolom Kiri: Form Input (Lebar 4 kolom) */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <ChatForm />
            </div>
          </div>

          {/* Kolom Kanan: List Data dengan Optimistic UI (Lebar 8 kolom) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-[#ede5d4] p-6 min-h-[600px]">
               <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Daftar Tiket Terbaru</h3>
                  {query && <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md">Filter: "{query}"</span>}
               </div>
              <Suspense fallback={<DashboardLoading />}>
                <ChatDataSection query={query} />
              </Suspense>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Fetching Logic
async function ChatDataSection({ query }: { query: string }) {
  const supabase = await createClient();
  let dbQuery = supabase
    .from("messages")
    .select("id, nama_lengkap, email, peran, pesan, created_at")
    .order("created_at", { ascending: false });

  if (query) {
    dbQuery = dbQuery.ilike("nama_lengkap", `%${query}%`);
  }

  const { data, error } = await dbQuery;

  if (error) return (
    <div className="rounded-xl bg-red-50 p-4 text-red-800 text-sm border border-red-100">
      Error memuat data dari database: {error.message}
    </div>
  );

  return <DataList items={(data as unknown as ChatItem[]) ?? []} />;
}