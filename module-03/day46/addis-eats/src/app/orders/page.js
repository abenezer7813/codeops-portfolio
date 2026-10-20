import { db } from "@/db";
import OrdersSummary from "./OrderSummary";
import RevenueChart from "./RevenueChart";
import OrdersPerDayChart from "./OrdersPerdayChart";


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



const ordersPerDay = [
  { date: "Oct 14", orders: 12 },
  { date: "Oct 15", orders: 18 },
  { date: "Oct 16", orders: 10 },
  { date: "Oct 17", orders: 22 },
  { date: "Oct 18", orders: 15 },
  { date: "Oct 19", orders: 25 },
  { date: "Oct 20", orders: 20 },
];

  return (
  <div>
    <div><OrdersSummary summary={summary} /></div>
    <div className="h-300 w-100"><RevenueChart data={revenueData} />;</div>
    <div className="h-300" w-300><OrdersPerDayChart data={ordersPerDay}/></div>
  </div>
  );
}