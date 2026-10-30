
import Link from "next/link";

export const metadata = {
  title: "Home | Addis Eats",
  description:
    "Discover Ethiopian food favorites and find delicious meals to order with Addis Eats.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf6f0]">
      <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        <span className="mb-6 rounded-full bg-[#f2e2d5] px-5 py-2 text-sm font-medium text-[#7a1f1f]">
          Authentic Ethiopian Food
        </span>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight text-[#321b1b] md:text-7xl">
          Your Favorite Ethiopian
          <span className="block text-[#9b3030]">
            Food, Delivered.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Discover the rich flavors of Ethiopia. Explore delicious traditional
          meals, order your favorites, and enjoy every bite with Addis Eats.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/menu"
            className="rounded-lg bg-[#7a1f1f] px-8 py-4 font-semibold text-white transition hover:bg-[#5e1717]"
          >
            Explore Menu →
          </Link>

          <Link
            href="/login"
            className="rounded-lg border border-[#7a1f1f] px-8 py-4 font-semibold text-[#7a1f1f] transition hover:bg-[#f2e2d5]"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold text-[#7a1f1f]">
              Authentic
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Traditional Ethiopian flavors
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#7a1f1f]">
              Convenient
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Easy and simple ordering
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#7a1f1f]">
              Delicious
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Meals made to satisfy
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
