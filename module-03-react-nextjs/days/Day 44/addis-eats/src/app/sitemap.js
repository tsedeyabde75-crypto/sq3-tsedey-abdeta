async function getDishes() {
  try {
    const res = await fetch("https://cdn.addiseats.et/dishes");
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const dishes = await getDishes();

  const dishUrls = dishes.map((d) => ({
    url: `https://addiseats.et/menu/${d.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: "https://addiseats.et",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://addiseats.et/menu",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...dishUrls,
  ];
}