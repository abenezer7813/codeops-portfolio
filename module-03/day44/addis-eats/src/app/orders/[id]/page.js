import { notFound } from "next/navigation";

import OrderStatus from "./OrderStatus";
import { getOrder } from "@/db";
export async function generateMetadata({ params }) {
  const { id } = await params;

  return {
    title: `Order ${id}`,
    description: `Check the status and details of your Addis Eats food order.`,
  };
}
export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);
  console.log(order);

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