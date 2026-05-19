'use client';

import { useEffect, useState } from 'react';

/* ─── Inline data (no external import needed) ────── */
const CHART_DATA = [
  { day: 'Sen', value: 620,  isHighlight: false },
  { day: 'Sel', value: 780,  isHighlight: false },
  { day: 'Rab', value: 512,  isHighlight: false },
  { day: 'Kam', value: 890,  isHighlight: false },
  { day: 'Jum', value: 710,  isHighlight: false },
  { day: 'Sab', value: 340,  isHighlight: false },
  { day: 'Min', value: 847,  isHighlight: true  },
];

const MATURITY_DATA = [
  { label: 'Matang',         pct: 52, color: '#2d7a4a' },
  { label: 'Hampir Matang',  pct: 28, color: '#84d49b' },
  { label: 'Mentah',         pct: 12, color: '#f59e0b' },
  { label: 'Terlalu Matang', pct: 8,  color: '#ef4444' },
];

/* ─── Weekly Scan Bar Chart ──────────────────────── */
export function WeeklyBarChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const max = Math.max(...CHART_DATA.map((d) => d.value));

  return (
    <section className="chart-card">
      <header className="chart-header">
        <h2 className="chart-title">Scan Alpukat Minggu Ini</h2>
        <span className="chart-badge-green">↑ 18% minggu lalu</span>
      </header>

      <div
        role="img"
        aria-label="Bar chart jumlah scan alpukat per hari"
        className="bar-chart-wrap"
      >
        {CHART_DATA.map((d, idx) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.day} className="bar-col">
              <span className="bar-val">{d.value}</span>
              <div
                className={`bar-fill ${d.isHighlight ? 'bar-fill--hi' : 'bar-fill--lo'} ${mounted ? 'bar-fill--mounted' : ''}`}
                style={{ height: `${pct}%`, animationDelay: `${idx * 70}ms` }}
                title={`${d.day}: ${d.value} scan`}
              />
              <span className="bar-lbl">{d.day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Maturity Distribution Donut Chart ─────────── */
export function DonutChart() {
  const total = MATURITY_DATA.reduce((s, d) => s + d.pct, 0);
  const circumference = 2 * Math.PI * 38;

  let offset = 0;
  const slices = MATURITY_DATA.map((d) => {
    const dash = (d.pct / total) * circumference;
    const slice = { ...d, dash, offset };
    offset += dash;
    return slice;
  });

  return (
    <section className="chart-card">
      <header className="chart-header">
        <h2 className="chart-title">Distribusi Kematangan</h2>
      </header>

      <div className="donut-wrap">
        <svg
          width={110}
          height={110}
          viewBox="0 0 100 100"
          role="img"
          aria-label="Donut chart distribusi kematangan alpukat"
          className="donut-svg"
        >
          <title>Distribusi tingkat kematangan alpukat</title>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#f5f3ef" strokeWidth="14" />
          {slices.map((s) => (
            <circle
              key={s.label}
              cx="50" cy="50" r="38"
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${s.dash} ${circumference - s.dash}`}
              strokeDashoffset={-s.offset}
              transform="rotate(-90 50 50)"
            />
          ))}
          <text x="50" y="46" textAnchor="middle" fontFamily="inherit" fontSize="13" fontWeight="700" fill="#111">
            {MATURITY_DATA[0].pct}%
          </text>
          <text x="50" y="58" textAnchor="middle" fontFamily="inherit" fontSize="8" fill="#888">
            Matang
          </text>
        </svg>

        <div className="donut-legend">
          {MATURITY_DATA.map((d) => (
            <div key={d.label} className="legend-row">
              <div className="legend-dot" style={{ background: d.color }} />
              <span className="legend-label">{d.label}</span>
              <span className="legend-pct">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
