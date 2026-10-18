"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";


export default function OrderStatus({ orderId, initialOrder }) {
  const { data: order, error, isLoading } = useSWR(
    `/api/orders/${orderId}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
      revalidateOnFocus: true,
    }
  );

  if (error) {
    console.log(error);
    return <p>Unable to refresh order status.</p>;
  }

  if (isLoading && !order) {
    return <p>Loading order...</p>;
  }

  return (
    <section>
      <h2>Current Status: {order.status}</h2>
      <p>Last updated: {order.updatedAt ?? "Waiting for an update"}</p>
    </section>
  );
}