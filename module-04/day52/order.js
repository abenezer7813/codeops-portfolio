"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"];
function formatEtb(santim) {
    return new Intl.NumberFormat("en-ET", {
        style: "currency",
        currency: "ETB",
    }).format(santim / 100);
}
function deliveryFee(order) {
    if (order.totalSantim > 50000)
        return 0; // free above 500 ETB
    if (order.area === "Bole")
        return 4000;
    return 6000;
}
function statusMessage(status) {
    switch (status) {
        case "PENDING":
            return "Waiting for the restaurant to accept";
        case "PREPARING":
            return "Your food is being cooked";
        case "ON_THE_WAY":
            return "The rider has left the restaurant";
        case "DELIVERED":
            return "Delivered - enjoy your meal";
        case "CANCELLED":
            return "This order was cancelled";
        case "REFUNDED":
            return "This order was refunded";
        default: {
            const unreachable = status;
            return unreachable;
        }
    }
}
function receipt(order) {
    const fee = deliveryFee(order);
    const lines = order.dishes
        .map((d) => `  ${d.name}: ${formatEtb(d.priceSantim)}`)
        .join("\n");
    return `
Addis Eats - Order #${order.id}
Customer: ${order.customer}
Area:     ${order.area}
Phone:    ${order.phone ?? "not provided"}
Status:   ${statusMessage(order.status)}
${lines}
Food:     ${formatEtb(order.totalSantim)}
Delivery: ${formatEtb(fee)}
Total:    ${formatEtb(order.totalSantim + fee)}
`.trim();
}
const sample = {
    id: 4821,
    customer: "Almaz Bekele",
    area: "Bole",
    status: "PREPARING",
    dishes: [
        { name: "Doro Wat", priceSantim: 32000 },
        { name: "Shiro", priceSantim: 18000 },
    ],
    totalSantim: 50000,
};
console.log(receipt(sample));
//# sourceMappingURL=order.js.map