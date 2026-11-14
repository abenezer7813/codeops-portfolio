
const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;

type Area = (typeof AREAS)[number];

type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "ON_THE_WAY"
  | "DELIVERED";

type Dish = {
  name: string;
  priceSantim: number;
};

type Order = {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  totalSantim: number;
};

function formatETB(amountSantim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(amountSantim / 100);
}

function deliveryFee(order: Order): number {
  if (order.totalSantim > 50000) {
    return 0;
  }

  if (order.area === "Bole") {
    return 4000;
  }

  return 6000;
}

function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Your order is waiting for confirmation.";

    case "PREPARING":
      return "Your food is being prepared.";

    case "READY":
      return "Your order is ready.";

    case "ON_THE_WAY":
      return "Your order is on the way.";

    case "DELIVERED":
      return "Your order has been delivered.";

    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

function receipt(order: Order): string {
  const fee = deliveryFee(order);

  return `
========== ADDIS EATS ==========
Order ID: ${order.id}
Customer: ${order.customer}
Area: ${order.area}

--------- DISHES ---------------
${order.dishes
  .map((dish) => `${dish.name}: ${formatETB(dish.priceSantim)}`)
  .join("\n")}

Subtotal: ${formatETB(order.totalSantim)}
Delivery: ${formatETB(fee)}
Total: ${formatETB(order.totalSantim + fee)}

Status: ${statusMessage(order.status)}
${order.phone ? `TeleBirr: ${order.phone}` : ""}
================================
`;
}

const myOrder: Order = {
  id: 101,
  customer: "Abenezer",
  area: "Bole",
  status: "PREPARING",
  dishes: [
    { name: "Doro Wat", priceSantim: 35000 },
    { name: "Injera", priceSantim: 5000 },
  ],
  phone: "0912345678",
  totalSantim: 40000,
};

console.log(receipt(myOrder));
