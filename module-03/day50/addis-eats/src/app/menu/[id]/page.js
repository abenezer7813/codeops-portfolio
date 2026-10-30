
import Link from "next/link";
import NotFound from "../not-found";
import { getDishes, getDish } from "@/db";

export async function generateStaticParams() {
  const dishes = await getDishes();

  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish could not be found on the Addis Eats menu.",
    };
  }

  return {
    title: dish.nameEn,
    description: dish.description,
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.nameEn,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.priceETB,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="min-h-screen bg-[#fdf6f0] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/menu"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#7a1f1f] hover:underline"
        >
          ← Back to Menu
        </Link>

        <div className="grid gap-8 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">

          <div className="relative">
            {dish.image && (
              <img
                src={dish.image}
                alt={dish.nameEn}
                className="h-80 w-full rounded-xl object-cover md:h-full"
              />
            )}

            {!dish.image && (
              <div className="flex h-80 items-center justify-center rounded-xl bg-[#f5e9df] text-[#7a1f1f]">
                <span className="text-lg font-medium">
                  {dish.nameEn}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col">

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#fdf0ea] px-3 py-1 text-xs font-medium text-[#7a1f1f]">
                {dish.category}
              </span>

              {dish.isSpecial && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  Chef's Special
                </span>
              )}

              {dish.isFasting && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  Fasting
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-[#7a1f1f]">
              {dish.nameEn}
            </h1>

            <p className="mt-2 text-xl text-gray-600">
              {dish.nameAm}
            </p>

            {dish.tagline && (
              <p className="mt-3 text-sm italic text-gray-500">
                {dish.tagline}
              </p>
            )}

            <p className="mt-5 leading-7 text-gray-600">
              {dish.description}
            </p>

            <div className="mt-6 border-y border-[#eee] py-5">
              <p className="text-sm text-gray-500">Price</p>
              <p className="mt-1 text-3xl font-bold text-[#7a1f1f]">
                ETB {Number(dish.priceETB).toLocaleString("en-ET")}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Spice Level</p>
                <p className="mt-1 font-medium text-gray-800">
                  {dish.spiceLevel || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Serving</p>
                <p className="mt-1 font-medium text-gray-800">
                  {dish.servings || "Not specified"}
                </p>
              </div>
            </div>

            {dish.ingredients?.length > 0 && (
              <div className="mt-7">
                <h2 className="mb-3 text-lg font-semibold text-[#7a1f1f]">
                  Ingredients
                </h2>

                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-lg bg-[#fdf6f0] px-3 py-2 text-sm text-gray-700"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/menu"
              className="mt-8 rounded-lg bg-[#7a1f1f] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#611818]"
            >
              Explore More Dishes
            </Link>

          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
