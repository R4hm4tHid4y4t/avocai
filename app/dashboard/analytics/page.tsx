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
  { label: "Matang", count: 624, pct: 50, color: "bg-green-500" },
  { label: "Setengah Matang", count: 312, pct: 25, color: "bg-amber-400" },
  { label: "Mentah", count: 249, pct: 20, color: "bg-red-400" },
  { label: "Busuk", count: 63, pct: 5, color: "bg-gray-400" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analitik</h1>
        <p className="text-gray-500 mt-1">Performa model dan statistik klasifikasi.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Minggu Ini", value: "392", delta: "+18%" },
          { label: "Akurasi Rata-rata", value: "98.2%", delta: "+0.3%" },
          { label: "Waktu Rata-rata", value: "1.18s", delta: "-0.05s" },
          { label: "Batch Diproses", value: "24", delta: "+4" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-400 mb-1">{card.label}</p>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs text-green-600 font-medium mt-0.5">{card.delta}</p>
          </div>
        ))}
      </div>

      {/* Weekly Bar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-6">Analisis per Hari (7 Hari Terakhir)</h2>
        <div className="flex items-end justify-between gap-2 h-40">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-green-600 font-medium">{d.count}</span>
              <div
                className="w-full bg-green-500 rounded-t-md opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${(d.count / maxCount) * 120}px` }}
              />
              <span className="text-xs text-gray-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Distribusi Hasil Klasifikasi</h2>
        <div className="space-y-3">
          {distribution.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 font-medium">{item.label}</span>
                <span className="text-gray-500">{item.count} ({item.pct}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className={`${item.color} h-2.5 rounded-full`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}