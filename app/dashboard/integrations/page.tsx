import type { Metadata } from "next";

export const metadata: Metadata = { title: "Integrasi API" };

export default function IntegrationsPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Integrasi API</h1>
        <p className="text-gray-500 mt-1">Kelola API key dan integrasi sistem eksternal.</p>
      </div>

      {/* API Key Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">API Key Aktif</h2>
          <button className="bg-green-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
            + Generate Key Baru
          </button>
        </div>
        <div className="space-y-3">
          {[
            { name: "Production Key", key: "avoc_live_••••••••••••••••a8f2", created: "12 Jan 2025", status: "active" },
            { name: "Staging Key", key: "avoc_test_••••••••••••••••c3d1", created: "5 Mar 2025", status: "active" },
          ].map((apiKey) => (
            <div key={apiKey.name} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 text-sm">{apiKey.name}</p>
                <p className="font-mono text-xs text-gray-400 mt-0.5">{apiKey.key}</p>
                <p className="text-xs text-gray-400 mt-1">Dibuat: {apiKey.created}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Aktif</span>
                <button className="text-xs text-gray-400 hover:text-gray-600">Salin</button>
                <button className="text-xs text-red-400 hover:text-red-600">Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhook */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Webhook</h2>
        <p className="text-sm text-gray-500 mb-3">
          Terima notifikasi real-time setiap hasil klasifikasi selesai.
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://api.yourapp.com/webhook"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
          />
          <button className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap">
            Simpan URL
          </button>
        </div>
      </div>

      {/* Docs */}
      <div className="bg-[#f0faf0] border border-green-100 rounded-xl p-5">
        <p className="text-sm font-semibold text-green-800 mb-1">📖 Dokumentasi API</p>
        <p className="text-sm text-green-700">
          Pelajari cara mengintegrasikan AvocAI ke dalam sistem Anda menggunakan REST API kami.
        </p>
        <a
          href="#"
          className="inline-block mt-3 text-sm font-medium text-green-700 hover:text-green-800 underline"
        >
          Buka Docs →
        </a>
      </div>
    </div>
  );
}