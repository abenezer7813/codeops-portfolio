import { Order } from "../../../../day53/order.types.js";

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>();

  constructor(seed: Order[] = []) {
    for (const o of seed) this.orders.set(o.id, o);
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return [...this.orders.values()];
  }
}
export const ORDER_REPOSITORY = "ORDER_REPOSITORY";