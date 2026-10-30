export default function robots() {
  const baseUrl = "https://codeops-portfolio-pi.vercel.app/";

  return {
    rules: {
      userAgent: "*",
      disallow: ["/cart", "/checkout"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}