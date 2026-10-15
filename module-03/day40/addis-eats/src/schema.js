import { z } from "zod";
export const orderSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty'),
    email: z.email('Invalid Email'),
    phone: z.string().regex(/^\d{9}$/, 'Invalid ethiopian Phone number'),
    subCity: z.string().min(1, 'SubCity can not be empty'),
    street: z.string().min(1, 'Street can not be empty'),
    landmark: z.string().min(1, 'Landmark can not be empty'),
    deliveryTime: z.string(),
    paymentMethod: z.enum(['telebirr', 'cbe', 'cod', 'amole']),
  })
