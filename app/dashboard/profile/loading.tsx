// app/dashboard/profile/loading.tsx

export default function ProfileLoading() {
  return (
    <div className="p-8 max-w-2xl animate-pulse">
      {/* Header Skeleton */}
      <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2" />
      <div className="h-4 w-64 bg-gray-100 rounded mb-8" />
      
      {/* Avatar Card Skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
        </div>
      </div>
      
      {/* Form Fields Skeleton */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-4 space-y-6">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-10 w-full bg-gray-50 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}