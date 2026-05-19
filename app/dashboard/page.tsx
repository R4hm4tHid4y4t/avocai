import React from "react";
// Import sesuai dengan nama fungsi yang ada di dalam file
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MetricCardComponent } from "@/components/dashboard/MetricCard";
import { WeeklyBarChart, DonutChart } from "@/components/dashboard/Charts";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";

export const metadata = {
  title: "Dashboard Kontrol Utama | AvocAI",
  description: "Pusat analisis data grading dan manajemen kemitraan AvocAI.",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-gray-800 font-sans">
      <Sidebar />

      <div className="flex-1 pl-0 md:pl-64 flex flex-col min-w-0 transition-all duration-300">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-[#1a3a2a]" style={{ fontFamily: "var(--font-judul)" }}>
              Pusat Kontrol Utama
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-bold text-[#2d6a4f] bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                Sistem Admin Aktif
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Baris Ringkasan Metrik (Menggunakan MetricCardComponent dan struktur props yang baru) */}
          <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCardComponent 
              card={{
                id: "1", label: "Total Analisis Buah", value: "1,248", change: "+12% minggu lalu", changeType: "up", icon: "🥑", accent: "green"
              }} 
            />
            <MetricCardComponent 
              card={{
                id: "2", label: "Tingkat Akurasi CNN", value: "98.4%", change: "Model v2.4-stable", changeType: "neutral", icon: "🎯", accent: "blue"
              }} 
            />
            <MetricCardComponent 
              card={{
                id: "3", label: "Distributor Aktif", value: "42", change: "3 Wilayah Baru", changeType: "up", icon: "🚚", accent: "amber"
              }} 
            />
            <MetricCardComponent 
              card={{
                id: "4", label: "Tiket Masuk", value: "7", change: "Membutuhkan respon", changeType: "down", icon: "🎫", accent: "red"
              }} 
            />
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* Grafik & Visualisasi Data (Menggunakan dua grafik terpisah) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                    <WeeklyBarChart />
                 </div>
                 <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                    <DonutChart />
                 </div>
              </div>
            </div>

            {/* Panel Aksi Cepat & Log Aktivitas */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4">Aksi Sistem B2B</h3>
                <QuickActions />
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4">Aktivitas Jaringan Terbaru</h3>
                <ActivityFeed />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}