/**
 * loading.tsx — Ditampilkan OTOMATIS oleh Next.js App Router
 * saat data dashboard sedang di-fetch (streaming + Suspense).
 *
 * Letakkan file ini di: app/dashboard/loading.tsx
 */

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ── Header skeleton ── */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {/* ── Search bar skeleton ── */}
      <div className="mb-6 h-11 w-full max-w-md animate-pulse rounded-xl bg-gray-200" />

      {/* ── Card grid skeleton ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// ── Komponen kartu skeleton ─────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Baris judul */}
      <div className="mb-3 h-5 w-3/4 animate-pulse rounded-md bg-gray-200" />
      {/* Baris deskripsi */}
      <div className="mb-2 h-4 w-full animate-pulse rounded-md bg-gray-100" />
      <div className="mb-4 h-4 w-5/6 animate-pulse rounded-md bg-gray-100" />
      {/* Footer kartu */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
        <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
