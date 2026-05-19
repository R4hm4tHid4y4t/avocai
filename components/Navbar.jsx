"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">🥑 AvocAI</Link>
      </div>
      <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <Link href="/" onClick={() => setIsOpen(false)}>Beranda</Link>
        <Link href="/services" onClick={() => setIsOpen(false)}>Layanan</Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>Tentang</Link>
        <Link href="/contact" onClick={() => setIsOpen(false)}>Kontak</Link>
        <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
        <Link href="/login" className={styles.loginBtn} onClick={() => setIsOpen(false)}>
          Login Enterprise
        </Link>
      </div>
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}