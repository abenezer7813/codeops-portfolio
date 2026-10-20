
import { db } from "@/db";
import OrdersSummary from "./OrderSummary";
import RevenueChart from "./RevenueChart";
import OrdersPerDayChart from "./OrdersPerdayChart";
import OrdersTable from "./OrdersTable";

export const metadata = {
  title: "Your Orders",
  description:
    "View your food orders and check their latest status with Addis Eats.",
};

const allowedSorts = ["id", "status", "total", "createdAt"];

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const orders = await db.order.findMany();

  const summary = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(
      (order) => order.status === "PENDING"
    ).length,
    completedOrders: orders.filter(
      (order) => order.status === "READY"
    ).length,
  };

  const sort = allowedSorts.includes(params.sort)
    ? params.sort
    : "createdAt";

  const direction = params.direction === "asc" ? "asc" : "desc";

  const sortedOrders = [...orders].sort((a, b) => {
    const first = a[sort];
    const second = b[sort];

    const result =
      typeof first === "number" && typeof second === "number"
        ? first - second
        : first instanceof Date && second instanceof Date
          ? first.getTime() - second.getTime()
          : String(first ?? "").localeCompare(String(second ?? ""));

    return direction === "asc" ? result : -result;
  });

  const pageSize = 5;
  const requestedPage = Number(params.page);
  const validPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const totalPages = Math.max(
    1,
    Math.ceil(sortedOrders.length / pageSize)
  );

  const page = Math.min(validPage, totalPages);

  const paginatedOrders = sortedOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
    <div className="grid gap-6">
      <OrdersSummary summary={summary} />

      <OrdersTable
        orders={paginatedOrders}
        sort={sort}
        direction={direction}
        page={page}
        totalPages={totalPages}
      />

      <div className="h-[400px] w-full">
        <RevenueChart data={revenueData} />
      </div>

      <OrdersPerDayChart data={ordersPerDay} />
    </div>
  );
}
