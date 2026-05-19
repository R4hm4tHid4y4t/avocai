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

  useEffect(() => {
    setMenuTerbuka(false);
  }, [pathname]);

  // KUNCI: Navbar otomatis menghilang di halaman login & dashboard
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <nav className={`${styles.navbar} ${terScroll ? styles.terScroll : ''}`}>
      <div className={`container ${styles.navDalam}`}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIkon}>🥑</div>
          <div className={styles.logonama}>Avoc<span>AI</span></div>
        </Link>
        
        <ul className={styles.menuDesktop}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.tautanNav}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.aksiDesktop}>
          <Link href="/login" className={styles.tombolLogin}>
            Login Enterprise
          </Link>
        </div>

        <button 
          className={`${styles.hamburger} ${menuTerbuka ? styles.terbuka : ''}`}
          onClick={() => setMenuTerbuka(!menuTerbuka)}
          aria-label="Toggle Menu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <div className={`${styles.menuMobile} ${menuTerbuka ? styles.menuMobileAktif : ''}`}>
        <ul className={styles.daftarMobile}>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.tautanMobile}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/login" className={styles.tombolLoginMobile}>
              Login Enterprise
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}