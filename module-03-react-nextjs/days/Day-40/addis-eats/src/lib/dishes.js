export const DISHES = [
  {
    id: "d1",
    title: "Special Beyaynetu",
    price: 180,
    category: "Fasting",
    description: "A colorful platter of mixed lentil stews, cabbage, beetroots, and shiro served over soft injera."
  },
  {
    id: "d2",
    title: "Doro Wot",
    price: 350,
    category: "Non-Fasting",
    description: "Slow-cooked traditional chicken stew made with rich berbere sauce and boiled eggs."
  },
  {
    id: "d3",
    title: "Tibs (Beef)",
    price: 320,
    category: "Non-Fasting",
    description: "Sautéed beef strips cooked with onions, green chillies, garlic, and seasoned butter."
  },
  {
    id: "d4",
    title: "Shiro Tegabeno",
    price: 150,
    category: "Fasting",
    description: "Rich, bubbling chickpea flour stew served hot in a traditional clay pot."
  }
];

export async function getDishes() {
  return DISHES;
}

export async function getDishById(id) {
  return DISHES.find((dish) => dish.id === id) || null;
}