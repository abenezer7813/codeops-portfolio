type Dish = { name: string; priceSantim: number };

const menu: Dish[] = [
  { name: "Doro Wat", priceSantim: 32000 },
  { name: "Shiro", priceSantim: 18000 },
  { name: "Tibs", priceSantim: 29000 },
  { name: "Kitfo", priceSantim: 35000 },
  { name: "Injera", priceSantim: 5000 },
  { name: "Misir Wat", priceSantim: 25000 },
  { name: "Gomen", priceSantim: 20000 },

  { name: "Alicha", priceSantim: 28000 },

  
];

export function formatEtb(santim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(santim / 100);

  
}

export function dishesUnder(dishes: Dish[], maxSantim: number): Dish[] {
  return dishes.filter((d) => d.priceSantim < maxSantim);
}

export function menuTotal(dishes: Dish[]): string {
  const total = dishes.reduce((sum, d) => sum + d.priceSantim, 0);
  return formatEtb(total);
}

console.log(dishesUnder(menu, 30000).map((d) => d.name));
console.log(`Menu total: ${menuTotal(menu)}`);