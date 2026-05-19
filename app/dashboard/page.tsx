import React, { Suspense } from "react";
import { createClient } from "@/app/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCardComponent } from "@/components/dashboard/MetricCard";
import { WeeklyBarChart, DonutChart } from "@/components/dashboard/Charts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import SearchBar from "@/app/components/SearchBar";
import DataList from "@/app/components/DataList";
import ChatForm from "@/app/components/ChatForm";

export const metadata = {
  title: "Pusat Kontrol Utama | AvocAI",
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: query = "" } = await searchParams;

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
    <div className="flex min-h-screen bg-[#f8f9fa] text-gray-800 w-full overflow-x-hidden">
      <Sidebar />

      <div className="flex-1 pl-0 md:pl-64 flex flex-col min-w-0 transition-all duration-300">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md">
          <h2 className="text-lg font-bold text-[#1a3a2a]">Pusat Kontrol Sistem</h2>
          <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
            Database Terkoneksi
          </span>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Ringkasan Statistik */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCardComponent card={{ id: "1", label: "Total Analisis Buah", value: "1,248", change: "+12% minggu ini", changeType: "up", icon: "🥑", accent: "green" }} />
            <MetricCardComponent card={{ id: "2", label: "Akurasi Klasifikasi", value: "98.4%", change: "CNN Model v2.4", changeType: "neutral", icon: "🎯", accent: "blue" }} />
            <MetricCardComponent card={{ id: "3", label: "Mitra Distributor", value: "42", change: "3 Wilayah Aktif", changeType: "up", icon: "🚚", accent: "amber" }} />
            <MetricCardComponent card={{ id: "4", label: "Antrean Tiket", value: "7 Pesan", change: "Perlu respons", changeType: "down", icon: "TXT", accent: "red" }} />
          </div>

          {/* Grafik & Panel Kontrol */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <WeeklyBarChart />
              <DonutChart />
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"><QuickActions /></div>
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"><ActivityFeed /></div>
            </div>
          </div>

          {/* Panel Administrasi & Pengujian CRUD */}
          <div className="border-t border-gray-200 pt-8 space-y-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Manajemen Kontak & Mitra B2B</h3>
                <p className="text-sm text-gray-500">Gunakan kolom di kanan untuk memfilter pencarian berbasis state URL.</p>
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
                <Suspense fallback={<div className="h-40 bg-gray-50 animate-pulse rounded-xl" />}>
                  {/* @ts-ignore - Data payload mismatch protection */}
                  <DataList items={messages || []} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}