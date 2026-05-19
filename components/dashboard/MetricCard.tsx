"use client";

import type { CSSProperties } from 'react';

interface MetricCardData {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  icon: string;
  accent: 'green' | 'blue' | 'amber' | 'red';
}

type Accent = MetricCardData['accent'];
type ChangeType = MetricCardData['changeType'];

const ACCENT_MAP: Record<Accent, string> = {
  green: 'linear-gradient(90deg, #3d9e60, #84d49b)',
  blue:  'linear-gradient(90deg, #3b82f6, #93c5fd)',
  amber: 'linear-gradient(90deg, #f59e0b, #fcd34d)',
  red:   'linear-gradient(90deg, #ef4444, #fca5a5)',
};

const ICON_BG_MAP: Record<Accent, string> = {
  green: '#e8f7ed',
  blue:  '#eff6ff',
  amber: '#fffbeb',
  red:   '#fef2f2',
};

const CHANGE_STYLES: Record<ChangeType, CSSProperties> = {
  up:      { background: '#e8f7ed', color: '#225c38' },
  down:    { background: '#fef2f2', color: '#dc2626' },
  neutral: { background: '#f5f3ef', color: 'rgba(0,0,0,0.45)' },
};

export function MetricCardComponent({ card }: { card: MetricCardData }) {
  const accentBar   = ACCENT_MAP[card.accent];
  const iconBg      = ICON_BG_MAP[card.accent];
  const changeStyle: CSSProperties = CHANGE_STYLES[card.changeType];

  return (
    <article
      style={{ background: '#fff', border: '1px solid #ede9e3', borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.2s', cursor: 'default' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
    >
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accentBar, borderRadius: '14px 14px 0 0' }} />
      <div aria-hidden style={{ width: 36, height: 36, borderRadius: 9, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, marginBottom: 14, marginTop: 4 }}>
        {card.icon}
      </div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#111', letterSpacing: '-0.5px', margin: 0 }}>
        {card.value}
      </p>
      <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 3, marginBottom: 0 }}>
        {card.label}
      </p>
      <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: 11, fontWeight: 500, marginTop: 10, padding: '3px 8px', borderRadius: 100, ...changeStyle }}>
        {card.change}
      </div>
    </article>
  );
}