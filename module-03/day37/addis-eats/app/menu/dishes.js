const API_URL = "https://addis-eats-backend.onrender.com/menu/";

export const categories = [
  "All",
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Raw & Cured Delicacies / Kitfo",
  "Fasting & Vegan / Tsom",
  "Beverages & Tej",
];

export async function getDishes() {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Failed to load menu (status ${res.status})`);
  }

  const json = await res.json();
  return json.data;
}

export async function getDish(id) {
  const dishes = await getDishes();
  return dishes.find((d) => String(d.id) === String(id));
}