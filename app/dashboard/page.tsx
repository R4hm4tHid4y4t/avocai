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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Kelola pesan masuk AvocAI</p>
        </div>

        <div className="mb-6">
          <SearchBar placeholder="Cari nama pengirim..." />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ChatForm />
          </div>
          <div className="lg:col-span-2">
            <Suspense fallback={<DashboardLoading />}>
              <ChatDataSection query={query} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  // Fix: Gunakan 'as unknown as ChatItem[]'
  return <DataList items={(data as unknown as ChatItem[]) ?? []} />;
}