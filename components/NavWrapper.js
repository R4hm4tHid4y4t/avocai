'use client';

import { usePathname } from 'next/navigation';

export default function NavWrapper({ navbar, footer }) {
  const pathname = usePathname();

  // Sembunyikan navbar & footer di halaman login dan dashboard
  const hideNav = pathname === '/login' || pathname.startsWith('/dashboard');

  if (hideNav) return null;

  return (
    <>
      {navbar}
      {footer}
    </>
  );
}