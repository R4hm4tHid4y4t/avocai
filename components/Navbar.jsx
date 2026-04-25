'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const menuItems = [
  { href: '/', label: 'Beranda' },
  { href: '/about', label: 'Tentang' },
  { href: '/services', label: 'Layanan' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Kontak' },
];

export default function Navbar() {
  const [terScroll, setTerScroll] = useState(false);
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setTerScroll(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu mobile saat navigasi
  useEffect(() => {
    setMenuTerbuka(false);
  }, [pathname]);

  return (
    <nav className={`${styles.navbar} ${terScroll ? styles.terScroll : ''}`}>
      <div className={`container ${styles.navDalam}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIkon}>🥑</div>
          <span className={styles.logonama}>
            Avoc<span>AI</span>
          </span>
        </Link>

        {/* Menu Desktop */}
        <ul className={styles.menuDesktop}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${styles.tautanNav} ${pathname === item.href ? styles.aktif : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navCta}>
          <Link href="/contact" className="tombol-utama" style={{ fontSize: '0.88rem', padding: '10px 22px' }}>
            Coba Gratis
          </Link>
          <button
            className={styles.tombolMenu}
            onClick={() => setMenuTerbuka(!menuTerbuka)}
            aria-label="Buka menu"
          >
            <span className={menuTerbuka ? styles.garisTutup1 : styles.garis}></span>
            <span className={menuTerbuka ? styles.garisTutup2 : styles.garis}></span>
            <span className={menuTerbuka ? styles.garisTutup3 : styles.garis}></span>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuTerbuka && (
        <div className={styles.menuMobile}>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.tautanMobile} ${pathname === item.href ? styles.aktifMobile : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
