export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-8">
      <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-40 rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  );
}