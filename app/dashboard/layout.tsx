import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s | AvocAI Dashboard",
    default: "Dashboard | AvocAI",
  },
  description: "Platform klasifikasi kematangan alpukat berbasis AI",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5ede8]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}