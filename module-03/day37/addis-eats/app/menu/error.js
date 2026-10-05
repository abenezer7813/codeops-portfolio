"use client";

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
      <p className="mb-4 text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="rounded-md bg-gray-900 px-4 py-2 text-white"
      >
        Try again
      </button>
    </div>
  );
}