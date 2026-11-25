import { Order } from "./order.types";
export interface OrderRepository {
    byId(id: number): Order | undefined;
    all(): Order[];
}
export declare class InMemoryOrderRepository implements OrderRepository {
    private readonly orders;
    constructor(seed?: Order[]);
    byId(id: number): Order | undefined;
    all(): Order[];
}
//# sourceMappingURL=order.repository.d.ts.map