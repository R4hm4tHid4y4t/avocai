"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

export default function SearchBar({ placeholder = "Cari data..." }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("q", term);
    else params.delete("q");
    params.delete("page");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [searchParams, pathname, router]);

  return (
    <div className="relative">
      <label htmlFor="search-input" className="sr-only">
        Cari pesan
      </label>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </span>
      <input
        type="text"
        id="search-input"
        defaultValue={searchParams.get("q")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}