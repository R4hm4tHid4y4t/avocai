import React, { Suspense } from "react";
import { createClient } from "@/app/lib/supabase/server";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCardComponent } from "@/components/dashboard/MetricCard";
import { WeeklyBarChart, DonutChart } from "@/components/dashboard/Charts";
import { QuickActions } from "@/components/dashboard/QuickActions";
import DataList from "@/app/components/DataList";
import ChatForm from "@/app/components/ChatForm";

export const metadata = { title: "Dashboard Kontrol Utama | AvocAI" };

export default async function DashboardPage() {
  // Fetching data untuk Optimistic UI List
  const supabase = await createClient();
  const { data: messages } = await supabase
    .from("messages")
    .select("id, nama_lengkap, email, peran, pesan, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-gray-800 font-sans">
      <Sidebar />
      <div className="flex-1 pl-0 md:pl-64 flex flex-col min-w-0 transition-all">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md">
          <h1 className="text-xl font-bold tracking-tight text-[#1a3a2a]">Pusat Kontrol Utama</h1>
          <span className="text-xs font-bold text-[#2d6a4f] bg-green-50 px-3 py-1.5 rounded-full border border-green-100">Live Server</span>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Section 1: Metrik AI & Bisnis */}
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCardComponent card={{ id: "1", label: "Analisis Buah", value: "1,248", change: "+12%", changeType: "up", icon: "🥑", accent: "green" }} />
            <MetricCardComponent card={{ id: "2", label: "Akurasi CNN", value: "98.4%", change: "Stabil", changeType: "neutral", icon: "🎯", accent: "blue" }} />
            <MetricCardComponent card={{ id: "3", label: "Distributor", value: "42", change: "Aktif", changeType: "up", icon: "🚚", accent: "amber" }} />
            <MetricCardComponent card={{ id: "4", label: "Tiket Aktif", value: "7", change: "Perlu Cek", changeType: "down", icon: "🎫", accent: "red" }} />
          </section>

          {/* Section 2: Visualisasi (Charts) & Quick Actions */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"><WeeklyBarChart /></div>
               <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"><DonutChart /></div>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4">Aksi Cepat</h3>
              <QuickActions />
            </div>
          </div>

          {/* Section 3: Manajemen Tiket B2B (Optimistic UI Testing Area) */}
          <section className="mt-8 border-t border-gray-200 pt-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manajemen Kemitraan & Tiket B2B</h2>
              <p className="text-sm text-gray-500">Kelola dan respons permintaan dari form kontak.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <ChatForm />
              </div>
              <div className="lg:col-span-8">
                {/* Komponen dengan Optimistic UI Hook */}
                <DataList items={messages || []} />
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}