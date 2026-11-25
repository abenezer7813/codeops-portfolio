"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDeclinedError = exports.OrderNotFoundError = void 0;
class OrderNotFoundError extends Error {
    orderId;
    constructor(orderId) {
        super(`Order ${orderId} not found`);
        this.orderId = orderId;
        this.name = "OrderNotFoundError";
    }
}
exports.OrderNotFoundError = OrderNotFoundError;
class PaymentDeclinedError extends Error {
    phone;
    reason;
    constructor(phone, reason) {
        super(`TeleBirr declined ${phone}: ${reason}`);
        this.phone = phone;
        this.reason = reason;
        this.name = "PaymentDeclinedError";
    }
}
exports.PaymentDeclinedError = PaymentDeclinedError;
//# sourceMappingURL=order.errors.js.map