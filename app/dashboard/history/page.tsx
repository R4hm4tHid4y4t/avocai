const scanHistory = [
  {
    id: "SCAN-2026-001",
    date: "20 Mei 2026, 14:32",
    variety: "Alpukat Miki",
    status: "Matang",
    confidence: "98.4%",
    image: "🥑",
    color: "bg-green-100 text-green-800 border-green-200"
  },
  {
    id: "SCAN-2026-002",
    date: "20 Mei 2026, 11:15",
    variety: "Alpukat Aligator",
    status: "Setengah Matang",
    confidence: "95.1%",
    image: "🥑",
    color: "bg-amber-100 text-amber-800 border-amber-200"
  },
  {
    id: "SCAN-2026-003",
    date: "19 Mei 2026, 16:45",
    variety: "Alpukat Miki",
    status: "Mentah",
    confidence: "97.8%",
    image: "🥑",
    color: "bg-slate-100 text-slate-700 border-slate-200"
  },
  {
    id: "SCAN-2026-004",
    date: "18 Mei 2026, 09:20",
    variety: "Alpukat Miki",
    status: "Terlalu Matang",
    confidence: "92.3%",
    image: "🥑",
    color: "bg-red-100 text-red-800 border-red-200"
  },
  {
    id: "SCAN-2026-005",
    date: "17 Mei 2026, 13:10",
    variety: "Alpukat Aligator",
    status: "Matang",
    confidence: "96.5%",
    image: "🥑",
    color: "bg-green-100 text-green-800 border-green-200"
  }
];

export default function HistoryPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto animate-fade-in">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Riwayat Scan</h1>
          <p className="text-gray-500 mt-1">Daftar seluruh hasil klasifikasi varietas dan tingkat kematangan buah alpukat.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            📥 Ekspor CSV
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Deteksi</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">1.248 <span className="text-xs font-normal text-gray-400">buah</span></p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Rata-rata Akurasi</p>
          <p className="text-2xl font-bold text-green-600 mt-1">96.2%</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Siap Distribusi</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">842 <span className="text-xs font-normal text-gray-400">buah</span></p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">🔍</span>
            <input 
              type="text" 
              placeholder="Cari varietas atau ID scan..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <select className="p-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 text-gray-700 cursor-pointer">
              <option>Semua Status</option>
              <option>Mentah</option>
              <option>Setengah Matang</option>
              <option>Matang</option>
              <option>Terlalu Matang</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase bg-gray-50/70 tracking-wider">
                <th className="py-4 px-6">ID Scan</th>
                <th className="py-4 px-6">Sampel</th>
                <th className="py-4 px-6">Waktu Klasifikasi</th>
                <th className="py-4 px-6">Varietas</th>
                <th className="py-4 px-6">Tingkat Kematangan</th>
                <th className="py-4 px-6 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {scanHistory.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="py-4 px-6 font-mono text-xs text-gray-500 group-hover:text-gray-900 transition-colors">
                    {row.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-xl border border-gray-100">
                      {row.image}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-500">
                    {row.date}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {row.variety}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">
                    {row.confidence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-gray-50 flex items-center justify-between text-sm text-gray-500 bg-gray-50/30">
          <span>Menampilkan <b>5</b> dari <b>1.248</b> hasil deteksi</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-xs font-semibold disabled:opacity-50 transition-colors" disabled>Sebelumnya</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-xs font-semibold transition-colors">Selanjutnya</button>
          </div>
        </div>
      </div>
    </div>
  );
}