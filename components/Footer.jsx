'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // KUNCI: Footer otomatis menghilang di halaman login & dashboard
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerAtas}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoFooter}>
            <div className={styles.logoIkon}>🥑</div>
            <div className={styles.logonama}>Avoc<span>AI</span></div>
          </Link>
          <p className={styles.deskripsiBrand}>
            Platform klasifikasi kematangan alpukat berbasis AI. Membantu petani dan distributor meningkatkan efisiensi panen dengan akurasi tinggi.
          </p>
        </div>

        <div className={styles.tautanGrid}>
          <div className={styles.grupTautan}>
            <h4 className={styles.judulTautan}>Produk</h4>
            <Link href="/services">Fitur Utama</Link>
            <Link href="/services#harga">Harga</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className={styles.grupTautan}>
            <h4 className={styles.judulTautan}>Perusahaan</h4>
            <Link href="/about">Tentang Kami</Link>
            <Link href="/blog">Blog & Studi Kasus</Link>
            <Link href="/contact">Hubungi Kami</Link>
          </div>
        </div>
      </div>
      
      <div className={`container ${styles.footerBawah}`}>
        <p>&copy; {currentYear} AvocAI. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
}