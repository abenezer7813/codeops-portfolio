import Link from "next/link";

export default function SessionNotFound() {
  return (
    <div className="mx-auto max-w-xl p-12 text-center">
      <h1 className="text-2xl font-bold">Session not found</h1>
      <p className="mt-2 text-gray-600">
        This session doesn&apos;t exist, or it doesn&apos;t belong to this event.
      </p>
      <Link
        href="/events"
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Browse all events
      </Link>
    </div>
  );
}