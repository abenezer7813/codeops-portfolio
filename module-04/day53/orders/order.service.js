"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_errors_1 = require("../order.errors");
class OrderService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    find(id) {
        const hit = this.repo.byId(id);
        if (!hit)
            throw new order_errors_1.OrderNotFoundError(id);
        return hit;
    }
    feesByArea() {
        return { Bole: 4000, Kazanchis: 6000, Piassa: 6000, Megenagna: 6000 };
    }
    summarise(key) {
        return this.repo.all().map((o) => o[key]);
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map