import { getDishes } from "@/db";

export default async function sitemap() {
  const baseUrl = "https://your-real-domain.com";
  const dishes = await getDishes();

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