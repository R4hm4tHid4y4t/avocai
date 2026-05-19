import React, { Suspense } from "react";
import { createClient } from "@/app/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCardComponent } from "@/components/dashboard/MetricCard";
import { WeeklyBarChart, DonutChart } from "@/components/dashboard/Charts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import SearchBar from "@/app/components/SearchBar";
import DataList, { type ChatItem } from "@/app/components/DataList";
import ChatForm from "@/app/components/ChatForm";

interface DashboardPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata = {
  title: "Pusat Kontrol Utama | AvocAI",
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { q: query = "" } = await searchParams;

  // Fetching data Supabase dengan filter pencarian URL State (Task 3)
  const supabase = await createClient();
  let dbQuery = supabase
    .from("messages")
    .select("id, nama_lengkap, email, peran, pesan, created_at")
    .order("created_at", { ascending: false });

  if (query) {
    dbQuery = dbQuery.ilike("nama_lengkap", `%${query}%`);
  }

  const { data: messages } = await dbQuery.limit(6);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-gray-800 font-sans w-full overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 pl-0 md:pl-64 flex flex-col min-w-0 transition-all duration-300">
        
        {/* Dashboard Topbar Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md">
          <h1 className="text-lg font-bold tracking-tight text-[#1a3a2a]" style={{ fontFamily: "var(--font-judul)" }}>
            Pusat Kontrol Sistem
          </h1>
          <span className="text-xs font-bold text-[#2d6a4f] bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
            Koneksi database aman
          </span>
        </header>

        {/* Dashboard Layout Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Row 1: Komponen Metrik Utama */}
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCardComponent card={{ id: "1", label: "Total Analisis Buah", value: "1,248", change: "+12% minggu ini", changeType: "up", icon: "🥑", accent: "green" }} />
            <MetricCardComponent card={{ id: "2", label: "Akurasi Klasifikasi", value: "98.4%", change: "CNN Model v2.4", changeType: "neutral", icon: "🎯", accent: "blue" }} />
            <MetricCardComponent card={{ id: "3", label: "Mitra Distributor", value: "42", change: "3 Wilayah Aktif", changeType: "up", icon: "🚚", accent: "amber" }} />
            <MetricCardComponent card={{ id: "4", label: "Antrean Tiket", value: "7 Pesan", change: "Perlu ditanggapi", changeType: "down", icon: "🎫", accent: "red" }} />
          </section>

          {/* Row 2: Komponen Grafik & Kontrol Bisnis */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <WeeklyBarChart />
              <DonutChart />
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"><QuickActions /></div>
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"><ActivityFeed /></div>
            </div>
          </div>

          {/* Row 3: Manajemen Hubungan Kemitraan (Fitur CRUD & Form Input) */}
          <section className="border-t border-gray-200 pt-8 space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Manajemen Data & Tiket Kemitraan</h2>
                <p className="text-sm text-gray-500">Kelola formulir masuk, filter pencarian, dan pengujian UI Optimistis.</p>
              </div>
              <div className="mt-4 sm:mt-0 w-full sm:w-64">
                <SearchBar placeholder="Cari nama pengirim..." />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <ChatForm />
              </div>
              <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <DataList items={(messages as unknown as ChatItem[]) || []} />
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}