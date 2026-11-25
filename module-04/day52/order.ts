const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;
type Area = (typeof AREAS)[number];

type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";
  

type Dish = { name: string; priceSantim: number };

type Order = {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  totalSantim: number; // food total, before delivery fee
};

function formatEtb(santim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(santim / 100);
}

function deliveryFee(order: Order): number {
  if (order.totalSantim > 50000) return 0; // free above 500 ETB
  if (order.area === "Bole") return 4000;
  return 6000;
}

function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Waiting for the restaurant to accept";
    case "PREPARING":
      return "Your food is being cooked";
    case "ON_THE_WAY":
      return "The rider has left the restaurant";
    case "DELIVERED":
      return "Delivered - enjoy your meal";
    case "CANCELLED":
      return "This order was cancelled";
    case "REFUNDED":
      return "This order was refunded";
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}

function receipt(order: Order): string {
  const fee = deliveryFee(order);
  const lines = order.dishes
    .map((d) => `  ${d.name}: ${formatEtb(d.priceSantim)}`)
    .join("\n");

  return `
Addis Eats - Order #${order.id}
Customer: ${order.customer}
Area:     ${order.area}
Phone:    ${order.phone ?? "not provided"}
Status:   ${statusMessage(order.status)}
${lines}
Food:     ${formatEtb(order.totalSantim)}
Delivery: ${formatEtb(fee)}
Total:    ${formatEtb(order.totalSantim + fee)}
`.trim();
}
const sample: Order = {
  id: 4821,
  customer: "Almaz Bekele",
  area: "Bole",
  status: "PREPARING",
  dishes: [
    { name: "Doro Wat", priceSantim: 32000 },
    { name: "Shiro", priceSantim: 18000 },
  ],
  totalSantim: 50000,
};

console.log(receipt(sample));