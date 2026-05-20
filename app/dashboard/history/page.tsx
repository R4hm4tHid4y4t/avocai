import type { Metadata } from "next";

export const metadata: Metadata = { title: "Riwayat Scan" };

const historyData = [
  { id: "SC-001248", jenis: "Alpukat Hass", hasil: "Matang", conf: 97.2, waktu: "2025-05-19 14:23", ukuran: "245g", status: "matang" },
  { id: "SC-001247", jenis: "Alpukat Mentega", hasil: "Setengah Matang", conf: 84.1, waktu: "2025-05-19 14:08", ukuran: "312g", status: "setengah" },
  { id: "SC-001246", jenis: "Alpukat Hass", hasil: "Mentah", conf: 91.8, waktu: "2025-05-19 13:51", ukuran: "198g", status: "mentah" },
  { id: "SC-001245", jenis: "Alpukat Hass", hasil: "Matang", conf: 99.1, waktu: "2025-05-19 13:30", ukuran: "267g", status: "matang" },
  { id: "SC-001244", jenis: "Alpukat Mentega", hasil: "Matang", conf: 95.6, waktu: "2025-05-19 12:15", ukuran: "289g", status: "matang" },
  { id: "SC-001243", jenis: "Alpukat Hass", hasil: "Busuk", conf: 88.3, waktu: "2025-05-19 11:42", ukuran: "201g", status: "busuk" },
  { id: "SC-001242", jenis: "Alpukat Hass", hasil: "Setengah Matang", conf: 79.4, waktu: "2025-05-19 10:55", ukuran: "234g", status: "setengah" },
];

const statusStyle: Record<string, string> = {
  matang: "bg-green-100 text-green-700",
  setengah: "bg-amber-100 text-amber-700",
  mentah: "bg-red-100 text-red-600",
  busuk: "bg-gray-100 text-gray-600",
};

export default function HistoryPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Scan</h1>
          <p className="text-gray-500 mt-1">Semua hasil klasifikasi alpukat.</p>
        </div>
        <button className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <input
            type="text"
            placeholder="Cari berdasarkan ID atau jenis alpukat..."
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-gray-50"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">ID Scan</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Jenis</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Hasil</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Akurasi</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ukuran</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {historyData.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-gray-600">{row.id}</td>
                  <td className="px-4 py-3 text-gray-700">{row.jenis}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyle[row.status]}`}>
                      {row.hasil}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-green-600 font-medium">{row.conf}%</td>
                  <td className="px-4 py-3 text-gray-500">{row.ukuran}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{row.waktu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-400">
          <span>Menampilkan 7 dari 1,248 hasil</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors">← Prev</button>
            <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 transition-colors">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}