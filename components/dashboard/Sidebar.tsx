'use client';

import type { CSSProperties } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, NAV_SETTINGS, MOCK_USER } from '@/lib/utils';
import type { NavItem } from '@/types';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi utama"
      style={{
        width: 240,
        flexShrink: 0,
        background: 'var(--green-950)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: 'var(--green-500)',
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            🥑
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.5px',
            }}
          >
            Avoc<span style={{ color: 'var(--green-400)' }}>AI</span>
          </span>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ padding: '16px 12px', flex: 1, overflowY: 'auto' }}>
        <NavSection label="Utama" items={NAV_ITEMS} pathname={pathname} />
        <NavSection
          label="Pengaturan"
          items={NAV_SETTINGS}
          pathname={pathname}
          style={{ marginTop: 8 }}
        />
      </div>

      {/* User footer */}
      <div
        style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'var(--green-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}
        >
          {MOCK_USER.avatarInitials}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
            }}
          >
            {MOCK_USER.name}
          </p>
          <p
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
              margin: 0,
              textTransform: 'capitalize',
            }}
          >
            {MOCK_USER.plan} Plan
          </p>
        </div>
        <Link
          href="/login"
          title="Keluar"
          style={{
            color: 'rgba(255,255,255,0.3)',
            fontSize: 16,
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'color 0.2s',
            padding: 4,
          }}
          aria-label="Keluar dari akun"
        >
          ⎋
        </Link>
      </div>
    </nav>
  );
}

/* ─── NavSection sub-component ───────────────────── */
function NavSection({
  label,
  items,
  pathname,
  style,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
  style?: CSSProperties;
}) {
  return (
    <div style={style}>
      <p
        style={{
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          padding: '0 8px',
          marginBottom: 8,
          marginTop: 0,
        }}
      >
        {label}
      </p>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.id}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: 8,
              marginBottom: 2,
              fontSize: 14,
              fontFamily: 'var(--font-body)',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
              background: isActive ? 'rgba(61,158,96,0.18)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                flexShrink: 0,
                background: isActive ? 'var(--green-400)' : 'rgba(255,255,255,0.2)',
                transition: 'background 0.15s',
              }}
            />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span
                style={{
                  background: 'var(--green-500)',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 100,
                  minWidth: 18,
                  textAlign: 'center',
                }}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
