"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"];
function formatETB(amountSantim) {
    return new Intl.NumberFormat("en-ET", {
        style: "currency",
        currency: "ETB",
    }).format(amountSantim / 100);
}
function deliveryFee(order) {
    if (order.totalSantim > 50000) {
        return 0;
    }
    if (order.area === "Bole") {
        return 4000;
    }
    return 6000;
}
function statusMessage(status) {
    switch (status) {
        case "PENDING":
            return "Your order is waiting for confirmation.";
        case "PREPARING":
            return "Your food is being prepared.";
        case "READY":
            return "Your order is ready.";
        case "ON_THE_WAY":
            return "Your order is on the way.";
        case "DELIVERED":
            return "Your order has been delivered.";
        default: {
            const exhaustiveCheck = status;
            return exhaustiveCheck;
        }
    }
}
function receipt(order) {
    const fee = deliveryFee(order);
    return `
========== ADDIS EATS ==========
Order ID: ${order.id}
Customer: ${order.customer}
Area: ${order.area}

--------- DISHES ---------------
${order.dishes
        .map((dish) => `${dish.name}: ${formatETB(dish.priceSantim)}`)
        .join("\n")}

Subtotal: ${formatETB(order.totalSantim)}
Delivery: ${formatETB(fee)}
Total: ${formatETB(order.totalSantim + fee)}

Status: ${statusMessage(order.status)}
${order.phone ? `TeleBirr: ${order.phone}` : ""}
================================
`;
}
const myOrder = {
    id: 101,
    customer: "Abenezer",
    area: "Bole",
    status: "PREPARING",
    dishes: [
        { name: "Doro Wat", priceSantim: 35000 },
        { name: "Injera", priceSantim: 5000 },
    ],
    phone: "0912345678",
    totalSantim: 40000,
};
console.log(receipt(myOrder));
//# sourceMappingURL=order.js.map