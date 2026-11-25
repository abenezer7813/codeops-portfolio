"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const service = new _1.OrderService(new _1.InMemoryOrderRepository( /* your seed orders */));
const names = service.summarise("customer"); // string[], not any[]
try {
    service.find(999);
}
catch (err) {
    if (err instanceof _1.OrderNotFoundError)
        console.error(`404 -> ${err.orderId}`);
    else
        console.error(String(err));
}
//# sourceMappingURL=main.js.map