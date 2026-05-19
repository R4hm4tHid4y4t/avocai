import type {
  MetricCard,
  ChartDataPoint,
  MaturityDataPoint,
  ActivityItem,
  NavItem,
  User,
} from '@/types';

/* ─── Mock User ──────────────────────────────────── */
export const MOCK_USER: User = {
  id: 'usr_01',
  name: 'Rahmat Hidayat',
  email: 'rahmat@avocai.id',
  avatarInitials: 'RH',
  plan: 'pro',
  createdAt: '2025-01-15',
};

/* ─── Dashboard Metrics (AvocAI) ─────────────────── */
export const METRICS: MetricCard[] = [
  {
    id: 'scans',
    label: 'Klasifikasi Hari Ini',
    value: '847',
    change: '↑ 23% dari kemarin',
    changeType: 'up',
    icon: '🥑',
    accent: 'green',
  },
  {
    id: 'ready',
    label: 'Siap Panen',
    value: '64%',
    change: '↑ 5% minggu ini',
    changeType: 'up',
    icon: '✅',
    accent: 'blue',
  },
  {
    id: 'accuracy',
    label: 'Akurasi Model',
    value: '96.4%',
    change: '↑ 0.2% bulan ini',
    changeType: 'up',
    icon: '🎯',
    accent: 'amber',
  },
  {
    id: 'speed',
    label: 'Waktu Deteksi',
    value: '142ms',
    change: '↓ 18ms lebih cepat',
    changeType: 'up',
    icon: '⚡',
    accent: 'red',
  },
];

/* ─── Weekly Scan Chart Data ─────────────────────── */
export const CHART_DATA: ChartDataPoint[] = [
  { day: 'Sen', value: 620 },
  { day: 'Sel', value: 780 },
  { day: 'Rab', value: 512 },
  { day: 'Kam', value: 890 },
  { day: 'Jum', value: 710 },
  { day: 'Sab', value: 340 },
  { day: 'Min', value: 847, isHighlight: true },
];

/* ─── Maturity Distribution (Donut Chart) ────────── */
export const MATURITY_DATA: MaturityDataPoint[] = [
  { label: 'Matang',         pct: 52, color: '#2d7a4a' },
  { label: 'Hampir Matang',  pct: 28, color: '#84d49b' },
  { label: 'Mentah',         pct: 12, color: '#f59e0b' },
  { label: 'Terlalu Matang', pct: 8,  color: '#ef4444' },
];

/* ─── Activity Feed ──────────────────────────────── */
export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'act_01',
    type: 'scan',
    title: 'Scan batch: 124 alpukat dari Kebun Pak Ahmad',
    time: '2 menit lalu',
    status: 'done',
  },
  {
    id: 'act_02',
    type: 'document',
    title: 'Export laporan kematangan mingguan ke CSV',
    time: '28 menit lalu',
    status: 'done',
  },
  {
    id: 'act_03',
    type: 'alert',
    title: 'Alert: 12 alpukat terdeteksi terlalu matang',
    time: '1 jam lalu',
    status: 'pending',
  },
  {
    id: 'act_04',
    type: 'config',
    title: 'Threshold kematangan diperbarui (95% → 96%)',
    time: '3 jam lalu',
    status: 'done',
  },
];

/* ─── Sidebar Navigation ──────────────────────────── */
export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard',  label: 'Dashboard',     icon: '▦', href: '/dashboard' },
  { id: 'classify',   label: 'Klasifikasi',   icon: '🥑', href: '/dashboard/classify', badge: 12 },
  { id: 'analytics',  label: 'Analitik',      icon: '📊', href: '/dashboard/analytics' },
  { id: 'history',    label: 'Riwayat Scan',  icon: '📋', href: '/dashboard/history' },
];

export const NAV_SETTINGS: NavItem[] = [
  { id: 'profile',      label: 'Profil',        icon: '👤', href: '/dashboard/profile' },
  { id: 'integrations', label: 'Integrasi API', icon: '🔌', href: '/dashboard/integrations' },
  { id: 'billing',      label: 'Billing',       icon: '💳', href: '/dashboard/billing' },
];

/* ─── Utilities ───────────────────────────────────── */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Selamat pagi';
  if (hour < 17) return 'Selamat siang';
  if (hour < 20) return 'Selamat sore';
  return 'Selamat malam';
}

export function formatDate(): string {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
