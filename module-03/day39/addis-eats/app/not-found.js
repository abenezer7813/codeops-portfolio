import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h2 className="mb-2 text-2xl font-semibold">Not found</h2>
      <p className="mb-6 text-gray-600">We couldn't find that page or dish.</p>
      <Link href="/menu" className="underline">
        Back to the menu
      </Link>
    </div>
  );
}