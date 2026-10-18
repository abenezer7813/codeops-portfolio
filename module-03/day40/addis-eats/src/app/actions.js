"use server"

import { createOrder } from "@/lib/db"
import { orderSchema } from "@/lib/schema"
import { revalidatePath } from "next/cache";

export async function placeOrder(data) {
    console.log(data);
    const result =orderSchema.safeParse(data)
    if(!result.success) return{fieldErrors:result.error.flatten().fieldErrors},
        {status:422}
    const res=await createOrder(result.data)
    revalidatePath('/orders')
    return {res,status:201}
    
}