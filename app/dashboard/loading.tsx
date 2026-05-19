export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] w-full">
      {/* Sidebar Placeholder */}
      <div className="hidden md:block w-64 h-screen bg-white border-r border-gray-100"></div>
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 border-b border-gray-100 bg-white/80 w-full"></div>
        <div className="flex-1 p-6 lg:p-8 space-y-8 animate-pulse">
          {/* 4 Cards Skeleton */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-white border border-gray-100 rounded-[14px]"></div>
            ))}
          </div>
          {/* Main Chart Skeleton */}
          <div className="h-[400px] bg-white border border-gray-100 rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
}