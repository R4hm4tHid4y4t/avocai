// app/dashboard/search-bar.jsx
// Task 3: URL as State — Search Bar dengan useSearchParams

"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./dashboard.module.css";

export default function SearchBar({ placeholder = "Cari pesan..." }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Update URL setiap kali user mengetik (tanpa reload halaman)
  const handleSearch = useCallback(
    (e) => {
      const query = e.target.value;
      const params = new URLSearchParams(searchParams);

      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      // Kembali ke halaman 1 saat search berubah
      params.delete("page");

      // Update URL tanpa reload — hasil search tersimpan di URL
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  return (
    <div className={styles.searchWrapper}>
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="search"
        className={styles.searchInput}
        placeholder={placeholder}
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleSearch}
      />
      {searchParams.get("q") && (
        <span className={styles.searchBadge}>
          Hasil: &quot;{searchParams.get("q")}&quot;
        </span>
      )}
    </div>
  );
}