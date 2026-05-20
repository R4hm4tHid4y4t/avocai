export default function DashboardLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-64 bg-gray-100 rounded mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-t-gray-200">
            <div className="w-8 h-8 bg-gray-200 rounded mb-3" />
            <div className="h-8 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-100 rounded mb-3" />
            <div className="h-5 w-24 bg-gray-100 rounded-full" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between py-3 border-b border-gray-50">
            <div className="h-4 w-64 bg-gray-100 rounded" />
            <div className="h-4 w-20 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}