
export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden border border-gray-200"
        >
          <div className="h-48 bg-gray-200" />

          <div className="p-4 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />

            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />

            <div className="flex justify-between items-center pt-2">
              <div className="h-5 bg-gray-200 rounded w-20" />
              <div className="h-9 w-9 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
