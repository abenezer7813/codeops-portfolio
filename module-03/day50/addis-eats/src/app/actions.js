"use server";

import { createOrder } from "@/db";
import { orderSchema } from "@/schema";
import { revalidatePath } from "next/cache";

export async function placeOrder(previousState, formData) {
  const data = Object.fromEntries(formData);

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return {
      status: 400,
      errors: result.error.flatten().fieldErrors,
    };
  }

  let items;

  try {
    items = JSON.parse(data.items || "[]");
  } catch {
    return {
      status: 400,
      message: "Invalid order items.",
    };
  }

  if (!items.length) {
    return {
      status: 400,
      message: "Your cart is empty.",
    };
  }
 
  const order = await createOrder({
    ...result.data,
    items: items.map((item) => ({
      dishId: item.id,
      name: item.nameEn,
      price: item.priceETB,
      quantity: item.quantity,
    })),
    total: Number(data.total),
  });
  console.log(order);
  revalidatePath("/orders");

  return {
    status: 201,
    message: "Order placed successfully!",
    res: order,
  };
}