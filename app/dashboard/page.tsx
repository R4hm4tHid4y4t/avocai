import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  {
    emoji: "🥑",
    value: "1,248",
    label: "Total Analisis Buah",
    badge: "+12% minggu lalu",
    badgeColor: "bg-green-100 text-green-700",
    borderColor: "border-t-green-500",
  },
  {
    emoji: "🎯",
    value: "98.4%",
    label: "Tingkat Akurasi CNN",
    badge: "Model v2.4-stable",
    badgeColor: "bg-slate-100 text-slate-600",
    borderColor: "border-t-blue-500",
  },
  {
    emoji: "🚚",
    value: "42",
    label: "Pengiriman Aktif",
    badge: "+3 hari ini",
    badgeColor: "bg-amber-100 text-amber-700",
    borderColor: "border-t-amber-500",
  },
  {
    emoji: "⚡",
    value: "1.2s",
    label: "Rata-rata Waktu Analisis",
    badge: "Dioptimalkan",
    badgeColor: "bg-purple-100 text-purple-700",
    borderColor: "border-t-purple-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Halaman Utama</h1>
        <p className="text-gray-500 mt-1">Selamat datang kembali, Rahmat.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-xl p-5 border-t-4 ${stat.borderColor} shadow-sm`}
          >
            <div className="text-2xl mb-3">{stat.emoji}</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm mb-3">{stat.label}</div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.badgeColor}`}>
              {stat.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-3">
          {[
            { label: "Alpukat Hass — Matang (97.2%)", time: "2 menit lalu", status: "matang" },
            { label: "Alpukat Mentega — Setengah Matang (84.1%)", time: "15 menit lalu", status: "setengah" },
            { label: "Alpukat Hass — Mentah (91.8%)", time: "32 menit lalu", status: "mentah" },
            { label: "Alpukat Hass — Matang (99.1%)", time: "1 jam lalu", status: "matang" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.status === "matang"
                      ? "bg-green-500"
                      : item.status === "setengah"
                      ? "bg-amber-400"
                      : "bg-red-400"
                  }`}
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}