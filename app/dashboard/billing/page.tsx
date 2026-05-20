"use client";

const plans = [
  {
    name: "Free",
    price: "Rp 0",
    period: null,
    features: ["50 analisis/bulan", "Akurasi dasar", "Dukungan email"],
    current: false,
  },
  {
    name: "Pro",
    price: "Rp 149.000",
    period: "/bulan",
    features: ["2.000 analisis/bulan", "Akurasi CNN penuh (98.4%)", "API akses", "Dukungan prioritas"],
    current: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: null,
    features: ["Analisis tidak terbatas", "Model khusus", "SLA 99.9%", "Dedicated support"],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1">Kelola langganan dan pembayaran Anda.</p>
      </div>

      <div className="bg-[#111811] text-white rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-400 text-sm font-medium mb-1">Plan Aktif</p>
            <p className="text-2xl font-bold">Pro Plan</p>
            <p className="text-gray-400 text-sm mt-1">
              Diperbarui 19 Mei 2025 • Berikutnya 19 Jun 2025
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">Rp 149.000</p>
            <p className="text-gray-400 text-sm">/bulan</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Penggunaan bulan ini</span>
            <span className="text-green-400">1.248 / 2.000 analisis</span>
          </div>
          <div className="mt-2 w-full bg-gray-800 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "62.4%" }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-xl p-5 shadow-sm border-2 ${
              plan.current ? "border-green-500" : "border-transparent"
            }`}
          >
            {plan.current && (
              <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                Plan Anda
              </span>
            )}
            <p className="text-lg font-bold text-gray-900 mt-2">{plan.name}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {plan.price}
              {plan.period && (
                <span className="text-sm font-normal text-gray-400">{plan.period}</span>
              )}
            </p>
            <ul className="mt-4 space-y-1.5">
              {plan.features.map((f) => (
                <li key={f} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              disabled={plan.current}
              className={`mt-5 w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                plan.current
                  ? "bg-gray-100 text-gray-400 cursor-default"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {plan.current ? "Plan Aktif" : "Pilih Plan"}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Riwayat Invoice</h2>
        <div className="space-y-2">
          {[
            { period: "Mei 2025", amount: "Rp 149.000", status: "Lunas" },
            { period: "Apr 2025", amount: "Rp 149.000", status: "Lunas" },
            { period: "Mar 2025", amount: "Rp 149.000", status: "Lunas" },
          ].map((inv) => (
            <div
              key={inv.period}
              className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">{inv.period}</p>
                <p className="text-xs text-gray-400">{inv.amount}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {inv.status}
                </span>
                <button className="text-xs text-gray-400 hover:text-gray-600">
                  Unduh PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}