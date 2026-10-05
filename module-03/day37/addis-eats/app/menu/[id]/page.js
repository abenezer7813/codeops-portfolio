// app/menu/[id]/page.js
import { notFound } from "next/navigation";
import { getDishes } from "../dishes";
import MenuCard from "../menu-card/MenuCard";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: String(d.id) }));
}

// export const dynamicParams = false; // uncomment to 404 on ids not listed at build

export default async function DishPage({ params }) {
  const { id } = await params; // Next 15+; on Next 14 use params.id directly
  const dishes = await getDishes();
  const dish = dishes.find((d) => String(d.id) === id);

  if (!dish) notFound();

  return <MenuCard data={dish} />;
}