"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryOrderRepository = void 0;
class InMemoryOrderRepository {
    orders = new Map();
    constructor(seed = []) {
        for (const o of seed)
            this.orders.set(o.id, o);
    }
    byId(id) {
        return this.orders.get(id);
    }
    all() {
        return [...this.orders.values()];
    }
}
exports.InMemoryOrderRepository = InMemoryOrderRepository;
//# sourceMappingURL=order.repository.js.map