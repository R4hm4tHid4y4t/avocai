const ACTIONS = [
  { icon: '📸', label: 'Scan Gambar',  sub: 'Upload foto alpukat',      href: '/dashboard/classify/single' },
  { icon: '📦', label: 'Scan Batch',   sub: 'Proses banyak sekaligus',  href: '/dashboard/classify/batch'  },
  { icon: '📊', label: 'Buat Laporan', sub: 'Export data & grafik',      href: '/dashboard/analytics'       },
  { icon: '🔌', label: 'API Key',      sub: 'Kelola integrasi',          href: '/dashboard/integrations'    },
];

export function QuickActions() {
  return (
    <section className="bottom-card">
      <header className="bottom-card-header">
        <h2 className="chart-title">Aksi Cepat</h2>
      </header>
      <div className="quick-grid">
        {ACTIONS.map((a) => (
          <a key={a.label} href={a.href} className="quick-btn">
            <span className="quick-icon">{a.icon}</span>
            <span className="quick-label">{a.label}</span>
            <span className="quick-sub">{a.sub}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
