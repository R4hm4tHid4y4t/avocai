export default function HistoryLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="h-8 w-40 bg-gray-200 rounded-lg mb-2" />
          <div className="h-4 w-60 bg-gray-100 rounded" />
        </div>
        <div className="h-9 w-28 bg-gray-200 rounded-lg" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="h-9 w-full bg-gray-100 rounded-lg" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-4 px-4 py-3.5 border-b border-gray-50">
            <div className="h-4 w-24 bg-gray-100 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-5 w-24 bg-gray-100 rounded-full" />
            <div className="h-4 w-12 bg-gray-100 rounded" />
            <div className="h-4 w-12 bg-gray-100 rounded" />
            <div className="h-4 w-32 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}