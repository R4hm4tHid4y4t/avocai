// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="min-h-[600px] animate-pulse">
      {/* Header internal skeleton */}
      <div className="border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
        <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
      </div>
      
      {/* Grid kartu skeleton */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-2 w-full">
                {/* Badge Role Skeleton */}
                <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                {/* Nama Pengirim Skeleton */}
                <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>
                {/* Email Skeleton */}
                <div className="h-3 w-1/2 bg-gray-200 rounded-md"></div>
              </div>
              {/* Tombol Hapus Skeleton */}
              <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
            </div>
            
            {/* Isi Pesan Skeleton */}
            <div className="flex-1 rounded-xl bg-gray-50 p-3 border border-gray-50 space-y-2 mt-2">
              <div className="h-3 w-full bg-gray-200 rounded-md"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded-md"></div>
            </div>

            {/* Tanggal Skeleton */}
            <div className="mt-4 flex items-center">
              <div className="h-3 w-24 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}