import type { CSSProperties } from 'react';

/* ─── Inline data (no external import needed) ────── */
const ACTIVITIES = [
  {
    id: 'act_01',
    type: 'scan' as const,
    title: 'Scan batch: 124 alpukat dari Kebun Pak Ahmad',
    time: '2 menit lalu',
    status: 'done' as const,
  },
  {
    id: 'act_02',
    type: 'document' as const,
    title: 'Export laporan kematangan mingguan ke CSV',
    time: '28 menit lalu',
    status: 'done' as const,
  },
  {
    id: 'act_03',
    type: 'alert' as const,
    title: 'Alert: 12 alpukat terdeteksi terlalu matang',
    time: '1 jam lalu',
    status: 'pending' as const,
  },
  {
    id: 'act_04',
    type: 'config' as const,
    title: 'Threshold kematangan diperbarui (95% → 96%)',
    time: '3 jam lalu',
    status: 'done' as const,
  },
];

type ActivityType = typeof ACTIVITIES[number];

/* ─── Lookup maps ────────────────────────────────── */
const ICON_MAP: Record<string, { icon: string; bg: string }> = {
  scan:     { icon: '🥑', bg: '#f0fdf4' },
  document: { icon: '📊', bg: '#eff6ff' },
  alert:    { icon: '⚠️', bg: '#fef2f2' },
  config:   { icon: '⚙️', bg: '#f5f3ef' },
  image:    { icon: '🖼️', bg: '#fdf4ff' },
  chat:     { icon: '💬', bg: '#f0fdf4' },
};

const STATUS_STYLES: Record<string, CSSProperties> = {
  done:    { background: '#e8f7ed', color: '#225c38' },
  pending: { background: '#fffbeb', color: '#b45309' },
  failed:  { background: '#fef2f2', color: '#dc2626' },
  alert:   { background: '#fef2f2', color: '#dc2626' },
};

const STATUS_LABELS: Record<string, string> = {
  done:    'Selesai',
  pending: 'Diproses',
  failed:  'Gagal',
  alert:   'Perlu Tindakan',
};

/* ─── ActivityRow sub-component ──────────────────── */
function ActivityRow({ item }: { item: ActivityType }) {
  const ico = ICON_MAP[item.type] ?? { icon: '📋', bg: '#f5f3ef' };
  const statusKey = item.type === 'alert' ? 'alert' : item.status;

  return (
    <div className="activity-row">
      <div className="activity-icon" style={{ background: ico.bg }}>
        {ico.icon}
      </div>
      <div className="activity-body">
        <p className="activity-title">{item.title}</p>
        <p className="activity-time">{item.time}</p>
        <span className="activity-badge" style={STATUS_STYLES[statusKey] ?? {}}>
          {STATUS_LABELS[statusKey] ?? statusKey}
        </span>
      </div>
    </div>
  );
}

/* ─── ActivityFeed component ─────────────────────── */
export function ActivityFeed() {
  return (
    <section className="bottom-card">
      <header className="bottom-card-header">
        <h2 className="chart-title">Aktivitas Terbaru</h2>
      </header>
      <div>
        {ACTIVITIES.map((item) => (
          <ActivityRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
