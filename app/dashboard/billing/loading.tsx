export default function BillingLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 w-24 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-60 bg-gray-100 rounded mb-8" />
      <div className="bg-gray-800 rounded-xl p-6 mb-6">
        <div className="flex justify-between">
          <div>
            <div className="h-3 w-20 bg-gray-700 rounded mb-2" />
            <div className="h-7 w-32 bg-gray-600 rounded mb-2" />
            <div className="h-3 w-56 bg-gray-700 rounded" />
          </div>
          <div className="h-10 w-24 bg-gray-600 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="h-5 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-7 w-24 bg-gray-200 rounded mb-4" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-3 w-full bg-gray-100 rounded mb-2" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}