import { Area, Order } from "./order.types";
import { OrderRepository } from "./order.repository";
export  class OrdersService {
    private readonly repo;
    constructor(repo: OrderRepository);
    find(id: number): Order;
    feesByArea(): Record<Area, number>;
    summarise<K extends keyof Order>(key: K): Order[K][];
}
//# sourceMappingURL=order.service.d.ts.map