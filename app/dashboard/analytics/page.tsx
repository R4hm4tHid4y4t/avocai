import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analitik" };

const weeklyData = [
  { day: "Sen", count: 45, accuracy: 97.2 },
  { day: "Sel", count: 62, accuracy: 98.1 },
  { day: "Rab", count: 38, accuracy: 97.8 },
  { day: "Kam", count: 91, accuracy: 98.4 },
  { day: "Jum", count: 74, accuracy: 98.0 },
  { day: "Sab", count: 53, accuracy: 97.5 },
  { day: "Min", count: 29, accuracy: 98.2 },
];
const maxCount = Math.max(...weeklyData.map((d) => d.count));

const distribution = [
  { label: "Mentah", count: 249, pct: 20, color: "bg-slate-400" },
  { label: "Setengah Matang", count: 312, pct: 25, color: "bg-amber-400" },
  { label: "Matang", count: 624, pct: 50, color: "bg-green-500" },
  { label: "Terlalu Matang", count: 63, pct: 5, color: "bg-red-500" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analitik Model</h1>
        <p className="text-gray-500 mt-1">Performa model klasifikasi CNN dan statistik deteksi harian.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: "Total Minggu Ini", value: "392", delta: "+18%", icon: "📈" },
          { label: "Akurasi Rata-rata", value: "98.2%", delta: "+0.3%", icon: "🎯" },
          { label: "Waktu Inferensi", value: "1.18s", delta: "-0.05s", icon: "⚡" },
          { label: "Batch Diproses", value: "24", delta: "+4", icon: "📦" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl">{card.icon}</div>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md">{card.delta}</span>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{card.label}</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-gray-900">Aktivitas (7 Hari Terakhir)</h2>
            <select className="text-sm border-gray-200 rounded-lg p-2 bg-gray-50 text-gray-700 outline-none cursor-pointer">
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
            </select>
          </div>
          
          <div className="flex items-end justify-between gap-2 h-56 mt-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              {[...Array(5)].map((_, i) => <div key={i} className="border-b border-gray-900 w-full flex-1"></div>)}
            </div>

            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 relative group cursor-pointer z-10">
                <span className="text-xs font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded shadow-sm border border-gray-100 -mb-1 absolute -top-8">
                  {d.count}
                </span>
                <div
                  className="w-full max-w-[48px] bg-green-500 rounded-t-xl opacity-80 group-hover:opacity-100 group-hover:bg-green-400 transition-all shadow-sm"
                  style={{ height: `${(d.count / maxCount) * 100}%` }}
                />
                <span className="text-sm font-medium text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution */}
        <div className="lg:col-span-1 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Distribusi Hasil</h2>
            <div className="space-y-6">
              {distribution.map((item) => (
                <div key={item.label} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-gray-700">{item.label}</span>
                    <span className="font-bold text-gray-900">{item.count} <span className="text-gray-400 font-normal">({item.pct}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:brightness-110`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <button className="text-green-600 hover:text-green-700 text-sm font-semibold transition-colors">
              Lihat Laporan Lengkap →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}