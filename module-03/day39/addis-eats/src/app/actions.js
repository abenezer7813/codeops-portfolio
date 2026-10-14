"use server"

import { createOrder } from "@/db"
import { orderSchema } from "@/schema"

export async function placeOrder(data) {
    console.log(data);
    const result =orderSchema.safeParse(data)
    if(!result.success) return{fieldErrors:result.error.flatten().fieldErrors},
        {status:422}
    const res=await createOrder(result.data)
    return {res,status:201}
    
}