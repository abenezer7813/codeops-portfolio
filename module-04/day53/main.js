"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("./orders");
const service = new orders_1.OrderService(new orders_1.InMemoryOrderRepository( /* your seed orders */));
const names = service.summarise("customer"); // string[], not any[]
try {
    service.find(999);
}
catch (err) {
    if (err instanceof orders_1.OrderNotFoundError)
        console.error(`404 -> ${err.orderId}`);
    else
        console.error(String(err));
}
//# sourceMappingURL=main.js.map