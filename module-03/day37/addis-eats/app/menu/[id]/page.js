export default async function DishPage({ params }) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold">Dish: {id}</h1>
    </div>
  );
}