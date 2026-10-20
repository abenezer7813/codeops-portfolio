import { db } from "@/db";
import OrdersSummary from "./OrderSummary";
import RevenueChart from "./RevenueChart";


export const metadata = {
  title: "Your Orders",
  description:
    "View your food orders and check their latest status with Addis Eats.",
};
export default async function Page() {

  const orders = await db.order.findMany();
  const summary = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(
      (order) => order.status === "PENDING"
    ).length,
    completedOrders: orders.filter(
      (order) => order.status === "COMPLETED"
    ).length,
  };
  const revenueData = [
    { date: "Mon", revenue: 2500 },
    { date: "Tue", revenue: 1800 },
    { date: "Wed", revenue: 3200 },
    { date: "Thu", revenue: 2100 },
    { date: "Fri", revenue: 4000 },
  ];





  return (
  <div>
    <div><OrdersSummary summary={summary} /></div>
    <div className="h-300 w-100"><RevenueChart data={revenueData} />;</div>
    
  </div>
  );
}