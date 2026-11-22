import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Campus Events
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Events
          </Link>
          <Link
            href="/create-event"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Create
          </Link>
        </nav>
      </div>
    </header>
  );
}