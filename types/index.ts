export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  icon: string;
  accent: 'green' | 'blue' | 'amber' | 'red';
}

export interface ChartDataPoint {
  day: string;
  value: number;
  isHighlight?: boolean;
}

export interface MaturityDataPoint {
  label: string;
  pct: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'chat' | 'document' | 'image' | 'analysis' | 'scan' | 'alert' | 'config';
  title: string;
  time: string;
  status: 'done' | 'pending' | 'failed';
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}