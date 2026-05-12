"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

interface SearchBarProps {
  placeholder?: string;
}

/**
 * SearchBar — Komponen pencarian berbasis URL (source of truth).
 *
 * - Setiap ketikan mengubah query param `?q=...` di URL.
 * - Tidak melakukan full reload (client-side navigation via replace).
 * - Nilai pencarian tetap ada saat halaman di-refresh.
 */
export default function SearchBar({
  placeholder = "Cari data...",
}: SearchBarProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Baca nilai saat ini dari URL agar input terkontrol
  const currentQuery = searchParams.get("q") ?? "";

  const handleSearch = useCallback(
    (term: string) => {
      // Buat object URLSearchParams baru dari yang sudah ada
      const params = new URLSearchParams(searchParams.toString());

      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }

      // Reset ke halaman 1 saat query berubah
      params.delete("page");

      // Update URL tanpa reload halaman penuh
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="relative w-full max-w-md">
      {/* Icon search */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
      </span>

      <input
        type="text"
        defaultValue={currentQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full rounded-xl border border-gray-200 bg-white py-2.5
          pl-10 pr-4 text-sm shadow-sm outline-none transition
          focus:border-green-400 focus:ring-2 focus:ring-green-100
          ${isPending ? "opacity-60" : "opacity-100"}
        `}
      />

      {/* Loading indicator saat navigasi berjalan */}
      {isPending && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">
          <svg
            className="h-4 w-4 animate-spin text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
page.tsx
