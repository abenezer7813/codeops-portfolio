"use server";

import { createOrder } from "@/db";
import { orderSchema } from "@/schema";
import { revalidatePath } from "next/cache";

export async function placeOrder(previousState, formData) {
    const data = Object.fromEntries(formData);
console.log("Converted data:", data);

const result = orderSchema.safeParse(data);

if (!result.success) {
    console.log("Validation errors:", result.error.flatten().fieldErrors);
}
    const res = await createOrder(result.data);

    revalidatePath("/orders");

    return { res, status: 201 };
}