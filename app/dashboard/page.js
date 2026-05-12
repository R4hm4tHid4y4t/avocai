// app/dashboard/page.js
// Dashboard Admin — Server Component
// Task 3: Membaca searchParams dari URL untuk filter data Supabase

import { supabaseAdmin } from "@/lib/supabase-admin";
import { logout } from "@/app/login/actions";
import SearchBar from "./search-bar";
import MessagesList from "./messages-list";
import styles from "./dashboard.module.css";
import Link from "next/link";

export const dynamic = "force-dynamic";

// Fetch messages dari Supabase dengan filter pencarian
async function fetchMessages(query) {
  let supabaseQuery = supabaseAdmin
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  // Filter berdasarkan kata kunci di URL (Task 3)
  if (query) {
    supabaseQuery = supabaseQuery.or(
      `nama_lengkap.ilike.%${query}%,email.ilike.%${query}%,pesan.ilike.%${query}%,peran.ilike.%${query}%`
    );
  }

  const { data, error } = await supabaseQuery;
  if (error) {
    console.error("Supabase error:", error);
    return [];
  }
  return data || [];
}

export default async function DashboardPage({ searchParams }) {
  const query = searchParams?.q || "";
  const messages = await fetchMessages(query);

  // Statistik
  const totalPesan = messages.length;
  const hari_ini = new Date().toDateString();
  const pesanHariIni = messages.filter(
    (m) => new Date(m.created_at).toDateString() === hari_ini
  ).length;
  const peranUnik = [...new Set(messages.map((m) => m.peran))].length;

  return (
    <div className={styles.layout}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <span className={styles.logoIcon}>🥑</span>
          <span className={styles.logoTeks}>
            Avoc<span>AI</span>
          </span>
          <span className={styles.navBadge}>Admin</span>
        </div>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            🌐 Lihat Website
          </Link>
          <form action={logout}>
            <button type="submit" className={styles.tombolLogout}>
              🚪 Keluar
            </button>
          </form>
        </div>
      </nav>

      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerJudul}>Dashboard Admin</h1>
            <p className={styles.headerSub}>
              Kelola dan pantau semua pesan masuk dari AvocAI
              {query && (
                <span className={styles.filterInfo}>
                  {" "}— menampilkan hasil untuk &quot;{query}&quot;
                </span>
              )}
            </p>
          </div>
          <Link href="/contact" className={styles.tombolPrimary}>
            + Form Kontak
          </Link>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📨</div>
            <div>
              <p className={styles.statAngka}>{totalPesan}</p>
              <p className={styles.statLabel}>
                {query ? "Hasil Pencarian" : "Total Pesan"}
              </p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📅</div>
            <div>
              <p className={styles.statAngka}>{pesanHariIni}</p>
              <p className={styles.statLabel}>Pesan Hari Ini</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <div>
              <p className={styles.statAngka}>{peranUnik}</p>
              <p className={styles.statLabel}>Jenis Pengirim</p>
            </div>
          </div>
        </div>

        {/* Tabel Pesan */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardJudul}>
              Daftar Pesan
              <span className={styles.countBadge}>{totalPesan}</span>
            </h2>
            {/* Task 3: Search Bar dengan URL State */}
            <SearchBar placeholder="Cari nama, email, atau pesan..." />
          </div>

          {/* Task 4: Optimistic UI via MessagesList */}
          <MessagesList messages={messages} />
        </div>
      </main>
    </div>
  );
}