"use client";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="mx-auto max-w-xl p-12 text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="mt-2 text-gray-600">
                We couldn&apos;t load this page. The server may be unavailable, so
                please check that the backend is running and try again.
            </p>
            <button
                onClick={() => reset()}
                className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
                Try again
            </button>
        </div>
    );
}