import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Halaman Tidak Ditemukan" };

export default function DashboardNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-96 text-center p-8">
      <div className="text-6xl mb-4">🥑</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Halaman tidak ditemukan</h2>
      <p className="text-gray-500 mb-6">Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link
        href="/dashboard"
        className="bg-green-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
}