import { db } from "@/db";

export default async function sitemap() {
  const baseUrl = "http://localhost:3000";
  const dishes = await db.dish.findMany();

  const staticRoutes = [
    "",
    "/menu",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...dishes.map((dish) => ({
      url: `${baseUrl}/menu/${dish.id}`,
      lastModified: new Date(),
    })),
  ];
}