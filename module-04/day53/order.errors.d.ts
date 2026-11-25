export declare class OrderNotFoundError extends Error {
    readonly orderId: number;
    constructor(orderId: number);
}
export declare class PaymentDeclinedError extends Error {
    readonly phone: string;
    readonly reason: string;
    constructor(phone: string, reason: string);
}
//# sourceMappingURL=order.errors.d.ts.map