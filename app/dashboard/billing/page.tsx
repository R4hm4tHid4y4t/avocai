// app/dashboard/billing/page.tsx

export default function BillingPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Billing & Langganan</h1>
        <p className="text-gray-500 mt-1">Kelola paket langganan, metode pembayaran, dan riwayat tagihan Anda.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri & Tengah: Paket Aktif & Penggunaan */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card Paket Aktif */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden group transition-shadow hover:shadow-md">
            {/* Aksen visual blur di sudut kanan atas */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-green-400/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110" />
            
            <div className="flex justify-between items-start mb-6 relative">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Paket Saat Ini</h2>
                <p className="text-gray-500 text-sm mt-1">AvocAI Pro Plan</p>
              </div>
              <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200/60 shadow-sm">
                Aktif
              </span>
            </div>
            
            <div className="mb-8 relative">
              <span className="text-4xl font-black text-gray-900 tracking-tight">Rp 499.000</span>
              <span className="text-gray-500 font-medium"> / bulan</span>
            </div>
            
            <div className="flex flex-wrap gap-3 relative">
              <button className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-600/20 active:scale-95">
                Tingkatkan Paket
              </button>
              <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold rounded-xl transition-all active:scale-95">
                Batalkan Langganan
              </button>
            </div>
          </div>

          {/* Card Riwayat Tagihan */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h3 className="text-lg font-bold text-gray-900">Riwayat Tagihan</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/80 text-gray-500 font-medium text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Tanggal</th>
                    <th className="py-4 px-6">Jumlah</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-gray-700">
                  <tr className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">01 Mei 2026</td>
                    <td className="py-4 px-6 font-medium">Rp 499.000</td>
                    <td className="py-4 px-6">
                      <span className="text-green-700 bg-green-50 px-2.5 py-1 rounded-md text-xs font-semibold border border-green-100">Lunas</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">Unduh PDF</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">01 Apr 2026</td>
                    <td className="py-4 px-6 font-medium">Rp 499.000</td>
                    <td className="py-4 px-6">
                      <span className="text-green-700 bg-green-50 px-2.5 py-1 rounded-md text-xs font-semibold border border-green-100">Lunas</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors">Unduh PDF</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Penggunaan & Metode Pembayaran */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Card Penggunaan */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-5">Penggunaan Kuota</h3>
            
            <div className="mb-2 flex justify-between text-sm font-medium">
              <span className="text-gray-500">Klasifikasi API</span>
              <span className="text-gray-900 font-bold">1.248 <span className="text-gray-400 font-normal">/ 10.000</span></span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4 overflow-hidden relative">
              <div className="bg-green-500 h-2.5 rounded-full w-[12.4%] relative z-10 transition-all duration-1000 ease-out"></div>
            </div>
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 leading-relaxed">
                Siklus tagihan dan kuota klasifikasi Anda akan direset secara otomatis pada <span className="font-semibold text-gray-700">1 Juni 2026</span>.
              </p>
            </div>
          </div>

          {/* Card Metode Pembayaran */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">Metode Pembayaran</h3>
              <button className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">Ubah</button>
            </div>
            
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
              <div className="w-12 h-8 bg-[#1a1f36] rounded-md flex items-center justify-center text-white font-bold italic text-xs shadow-sm">
                VISA
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 tracking-tight">Visa berakhiran 4242</p>
                <p className="text-xs text-gray-500 mt-0.5">Kedaluwarsa 12/28</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}