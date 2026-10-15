export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/orders"],
    },
    sitemap: "https://addiseats.et/sitemap.xml",
  };
}