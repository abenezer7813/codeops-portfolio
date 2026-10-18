import { notFound } from "next/navigation";

import OrderStatus from "./OrderStatus";
import { getOrder } from "@/db";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <main>
      <h1>Order Status</h1>

      <p>Order ID: {order.id}</p>
      <p>Initial status: {order.status}</p>

      <OrderStatus
        orderId={id}
        initialOrder={order}
      />
    </main>
  );
}