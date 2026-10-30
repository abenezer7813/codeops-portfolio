"use client";

export default function OrdersSummary({ summary }) {
  if (summary.totalOrders === 0) {
    return <p>No orders yet.</p>;
  }

  return (
    <div>
      <h1>Orders Summary</h1>
      <p>Total Orders: {summary.totalOrders}</p>
      <p>Pending Orders: {summary.pendingOrders}</p>
      <p>Completed Orders: {summary.completedOrders}</p>
    </div>
  );
}