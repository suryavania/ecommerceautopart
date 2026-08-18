// src/app/products/loading.tsx — Loading skeleton katalog

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar skeleton */}
        <div className="w-full lg:w-60 flex-shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
            {[...Array(6)].map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded-lg mb-1" />)}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-28 mb-4" />
            {[...Array(5)].map((_, i) => <div key={i} className="h-8 bg-gray-100 rounded-lg mb-1" />)}
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-40 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-100 rounded w-32 mb-6 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="flex justify-between items-center pt-1">
                    <div className="h-5 bg-gray-200 rounded w-20" />
                    <div className="h-8 bg-gray-200 rounded-xl w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
