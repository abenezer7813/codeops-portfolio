import { db } from "@/db";
export const metadata = {
  title: "Your Orders",
  description:
    "View your food orders and check their latest status with Addis Eats.",
};
export default async function Page() {
  const orders = await db.order.findMany();

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">All Orders</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold">
              Order ID: {order.id}
            </h2>

            <p>Name: {order.name}</p>
            <p>Email: {order.email}</p>
            <p>Phone: {order.phone}</p>
            <p>Status: {order.status}</p>
            <p>Street: {order.street}</p>
            <p>Sub-city: {order.subCity}</p>
            <p>Landmark: {order.landmark}</p>
            <p>
              Created: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}