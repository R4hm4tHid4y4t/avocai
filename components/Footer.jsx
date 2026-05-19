import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🥑</span>
            <span className={styles.logoText}>AvocAI</span>
          </div>
          <p className={styles.description}>
            Memberdayakan petani dan industri agritech dengan klasifikasi alpukat berbasis AI yang akurat dan efisien.
          </p>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkGroup}>
            <h4>Produk</h4>
            {/* NO DEAD ENDS: Mengarah ke halaman yang sudah ada */}
            <Link href="/services">Fitur Utama</Link>
            <Link href="/dashboard">Enterprise Dashboard</Link>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Perusahaan</h4>
            <Link href="/about">Tentang Kami</Link>
            <Link href="/contact">Hubungi Sales</Link>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} AvocAI. All rights reserved.</p>
      </div>
    </footer>
  );
}