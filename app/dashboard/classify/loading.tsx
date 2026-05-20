export default function ClassifyLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 w-56 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-80 bg-gray-100 rounded mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-200 rounded-2xl min-h-64 bg-gray-50" />
        <div className="bg-white rounded-2xl p-6 shadow-sm min-h-64">
          <div className="h-6 w-36 bg-gray-200 rounded mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-3/4 bg-gray-100 rounded" />
            <div className="h-4 w-1/2 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}