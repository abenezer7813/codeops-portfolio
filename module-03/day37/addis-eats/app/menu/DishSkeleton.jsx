// app/menu/DishSkeleton.jsx
export default function DishSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-48 animate-pulse rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}