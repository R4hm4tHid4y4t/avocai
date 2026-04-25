import Link from 'next/link';
import styles from './page.module.css';

// Halaman utama — Server Component (tidak ada 'use client')
export const metadata = {
  title: 'AvocAI – Klasifikasi Alpukat Otomatis',
};

const daftarFitur = [
  {
    ikon: '🔬',
    judul: 'Akurasi 96%',
    deskripsi: 'Model AI kami dilatih dari 50.000+ gambar alpukat nyata dari berbagai kondisi lapangan.',
  },
  {
    ikon: '⚡',
    judul: 'Real-time < 200ms',
    deskripsi: 'Inferensi sangat cepat sehingga cocok dipasang langsung di lini produksi atau kamera lapangan.',
  },
  {
    ikon: '📊',
    judul: 'Dashboard Analitik',
    deskripsi: 'Pantau tren kualitas panen, ekspor laporan CSV, dan buat keputusan distribusi berbasis data.',
  },
  {
    ikon: '🔌',
    judul: 'API Terintegrasi',
    deskripsi: 'REST API dengan dokumentasi lengkap. SDK tersedia untuk Node.js, Python, dan PHP.',
  },
];

const statistik = [
  { angka: '96%', label: 'Akurasi Klasifikasi' },
  { angka: '50rb+', label: 'Gambar Pelatihan' },
  { angka: '200ms', label: 'Waktu Inferensi' },
  { angka: '500+', label: 'Pengguna Aktif' },
];

export default function HalamanBeranda() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroKonten}`}>
          <span className="badge">🥑 AI untuk Agritech Indonesia</span>
          <h1 className={styles.judulHero}>
            Klasifikasi Kematangan Alpukat{' '}
            <span className={styles.aksen}>Secara Otomatis</span>
          </h1>
          <p className={styles.subjudulHero}>
            AvocAI menggunakan computer vision untuk mendeteksi 4 tingkat kematangan alpukat
            secara instan — membantu petani, distributor, dan eksportir bekerja lebih efisien.
          </p>
          <div className={styles.tombolGrup}>
            <Link href="/contact" className="tombol-utama">
              Coba Gratis 14 Hari →
            </Link>
            <Link href="/services" className="tombol-sekunder">
              Lihat Layanan
            </Link>
          </div>
        </div>

        {/* Dekorasi latar */}
        <div className={`${styles.dekorasi} ${styles.lingkaranBesar}`}></div>
        <div className={`${styles.dekorasi} ${styles.lingkaranKecil}`}></div>
      </section>

      {/* ===== STATISTIK ===== */}
      <section className={styles.seksiStat}>
        <div className="container">
          <div className={styles.gridStat}>
            {statistik.map((item) => (
              <div key={item.label} className={styles.kartuStat}>
                <span className={styles.angkaStat}>{item.angka}</span>
                <span className={styles.labelStat}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FITUR ===== */}
      <section>
        <div className="container">
          <div className="kepala-seksi">
            <span className="badge">✨ Fitur Unggulan</span>
            <h2 className="judul-seksi">Teknologi yang Bekerja untuk Anda</h2>
            <p className="subjudul-seksi">
              Dari deteksi otomatis hingga laporan analitik — semua yang dibutuhkan
              dalam satu platform terintegrasi.
            </p>
          </div>

          <div className={styles.gridFitur}>
            {daftarFitur.map((fitur) => (
              <div key={fitur.judul} className={styles.kartuFitur}>
                <div className={styles.ikonFitur}>{fitur.ikon}</div>
                <h3 className={styles.judulFitur}>{fitur.judul}</h3>
                <p className={styles.deskripsiFitur}>{fitur.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.seksiCta}>
        <div className="container">
          <div className={styles.kotakCta}>
            <h2 className={styles.judulCta}>Siap Tingkatkan Efisiensi Panen Anda?</h2>
            <p className={styles.subCta}>
              Bergabunglah dengan 500+ petani dan perusahaan agritech yang sudah menggunakan AvocAI.
            </p>
            <Link href="/contact" className="tombol-utama">
              Mulai Sekarang — Gratis ✓
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
