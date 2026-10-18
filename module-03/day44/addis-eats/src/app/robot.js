export default function robots() {
  const baseUrl = "http://localhost:3000/";

  return {
    rules: {
      userAgent: "*",
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}