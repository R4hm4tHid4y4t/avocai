export default function AnalyticsLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 w-32 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-72 bg-gray-100 rounded mb-8" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="h-3 w-24 bg-gray-100 rounded mb-2" />
            <div className="h-6 w-16 bg-gray-200 rounded mb-1" />
            <div className="h-3 w-10 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="h-5 w-56 bg-gray-200 rounded mb-6" />
        <div className="flex items-end gap-2 h-40">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-gray-200 rounded-t" style={{ height: `${40 + i * 12}px` }} />
              <div className="h-3 w-6 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}