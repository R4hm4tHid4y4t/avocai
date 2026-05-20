"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/dashboard", badge: null },
  { label: "Klasifikasi", href: "/dashboard/classify", badge: 12 },
  { label: "Analitik", href: "/dashboard/analytics", badge: null },
  { label: "Riwayat Scan", href: "/dashboard/history", badge: null },
];

const settingsItems = [
  { label: "Profil", href: "/dashboard/profile" },
  { label: "Integrasi API", href: "/dashboard/integrations" },
  { label: "Billing", href: "/dashboard/billing" },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-60 flex-shrink-0 bg-[#111811] flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-9 h-9 bg-[#2d5a2d] rounded-lg flex items-center justify-center text-lg">
          🥑
        </div>
        <span className="text-white font-semibold text-lg tracking-tight">
          Avoc<span className="text-[#4ade80]">AI</span>
        </span>
      </div>

      {/* Nav Utama */}
      <nav className="flex-1 px-3 pt-2">
        <p className="text-[#6b7a6b] text-[10px] font-semibold uppercase tracking-widest px-2 mb-2">
          Utama
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-[#1e3a1e] text-white font-medium"
                    : "text-[#9aad9a] hover:text-white hover:bg-[#1a2e1a]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive(item.href) ? "bg-[#4ade80]" : "bg-[#4a5e4a]"
                    }`}
                  />
                  {item.label}
                </span>
                {item.badge && (
                  <span className="bg-[#16a34a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Nav Pengaturan */}
        <p className="text-[#6b7a6b] text-[10px] font-semibold uppercase tracking-widest px-2 mb-2 mt-6">
          Pengaturan
        </p>
        <ul className="space-y-0.5">
          {settingsItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-[#1e3a1e] text-white font-medium"
                    : "text-[#9aad9a] hover:text-white hover:bg-[#1a2e1a]"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive(item.href) ? "bg-[#4ade80]" : "bg-[#4a5e4a]"
                  }`}
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-[#1e2e1e]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#2d5a2d] flex items-center justify-center text-white text-xs font-bold">
            RH
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Rahmat Hidayat</p>
            <p className="text-[#6b7a6b] text-xs">Pro Plan</p>
          </div>
          <button className="text-[#6b7a6b] hover:text-white transition-colors">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}