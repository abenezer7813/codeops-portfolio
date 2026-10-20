import { db } from "@/db";
import OrdersSummary from "./OrderSummary";

export const metadata = {
  title: "Your Orders",
  description:
    "View your food orders and check their latest status with Addis Eats.",
};
export default async function Page() {

  const orders = await db.order.findMany();
  const summary = {
    totalOrders: 0,
    pendingOrders: orders.filter(
      (order) => order.status === "PENDING"
    ).length,
    completedOrders: orders.filter(
      (order) => order.status === "COMPLETED"
    ).length,
  };
  return (
    <OrdersSummary summary={summary}/>
  );
}