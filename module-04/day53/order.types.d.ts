declare const AREAS: readonly ["Bole", "Kazanchis", "Piassa", "Megenagna"];
export type Area = (typeof AREAS)[number];
export type OrderStatus = "PENDING" | "PREPARING" | "ON_THE_WAY" | "DELIVERED" | "CANCELLED" | "REFUNDED";
export type Dish = {
    name: string;
    priceSantim: number;
};
export type Order = {
    readonly id: number;
    customer: string;
    area: Area;
    status: OrderStatus;
    dishes: Dish[];
    phone?: string;
    totalSantim: number;
};
export {};
//# sourceMappingURL=order.types.d.ts.map