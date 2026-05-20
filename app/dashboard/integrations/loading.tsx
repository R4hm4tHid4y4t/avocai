export default function IntegrationsLoading() {
  return (
    <div className="p-8 max-w-3xl animate-pulse">
      <div className="h-8 w-40 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-72 bg-gray-100 rounded mb-8" />
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <div className="flex justify-between mb-4">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-8 w-36 bg-gray-200 rounded-lg" />
        </div>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 mb-3">
            <div className="h-4 w-28 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-56 bg-gray-100 rounded mb-1" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}