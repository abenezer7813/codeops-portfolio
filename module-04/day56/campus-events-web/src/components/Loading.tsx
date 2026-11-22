export default function Loading({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-20 text-gray-500"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <p>{label}</p>
    </div>
  );
}