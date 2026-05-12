// app/login/page.js
// Halaman Login Admin AvocAI

"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "./actions";
import styles from "./login.module.css";
import Link from "next/link";

const initialState = { success: false, message: "" };

function TombolLogin() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={styles.tombol}>
      {pending ? (
        <>
          <div className={styles.spinner}></div>
          Masuk...
        </>
      ) : (
        <>🔐 Masuk ke Dashboard</>
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useFormState(login, initialState);
  const safeState = state ?? initialState;

  return (
    <div className={styles.halaman}>
      {/* Panel Kiri — Branding */}
      <div className={styles.branding}>
        <div className={styles.brandingPattern} />

        <Link href="/" className={styles.logo}>
          <span>
          </span>
        </Link>

        <div className={styles.brandingKonten}>
          <p className={styles.brandingTagline}>✦ Admin Panel</p>
          <h1 className={styles.brandingJudul}>
            Kelola Data
            <br />
            <span>Pesan Masuk</span>
            <br />
            dengan Mudah
          </h1>
          <p className={styles.brandingSub}>
            Dashboard terpusat untuk memantau semua pesan dari petani,
            distributor, dan mitra bisnis AvocAI. Hapus, cari, dan filter
            data secara real-time.
          </p>
        </div>

        <div className={styles.brandingStats}>
          <div className={styles.stat}>
            <div className={styles.statAngka}>96%</div>
            <div className={styles.statLabel}>Akurasi AI</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statAngka}>500+</div>
            <div className={styles.statLabel}>Pengguna Aktif</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statAngka}>200ms</div>
            <div className={styles.statLabel}>Waktu Respons</div>
          </div>
        </div>
      </div>

      {/* Panel Kanan — Form */}
      <div className={styles.formArea}>
        <div className={styles.formBox}>
          <div className={styles.formHeader}>
            <span className={styles.formBadge}>🔒 Akses Terbatas</span>
            <h2 className={styles.formJudul}>Selamat Datang</h2>
            <p className={styles.formSub}>
              Masuk untuk mengakses panel admin AvocAI.
            </p>
          </div>

          {/* Error Alert */}
          {safeState.message && !safeState.success && (
            <div className={styles.alertError}>
              ⚠️ {safeState.message}
            </div>
          )}

          <form action={formAction} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Username</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  name="username"
                  placeholder="admin"
                  autoComplete="username"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔑</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={styles.input}
                />
              </div>
            </div>

            <TombolLogin />
          </form>

          <Link href="/" className={styles.backLink}>
            ← Kembali ke AvocAI
          </Link>
        </div>
      </div>
    </div>
  );
}