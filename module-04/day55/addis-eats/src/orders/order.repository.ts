import { Order } from "../../../../day53/order.types.js";

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
   save(order: Omit<Order, "id">): Order;
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders = new Map<number, Order>();
 private nextId = 1;

  
  constructor(seed: Order[] = []) {
    for (const o of seed) {
      this.orders.set(o.id, o);
      this.nextId = Math.max(this.nextId, o.id + 1);
    }
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return [...this.orders.values()];
  }
  save(order: Omit<Order, "id">): Order {
    const saved: Order = { ...order, id: this.nextId++ };
    this.orders.set(saved.id, saved);
    return saved;
  }
}
export const ORDER_REPOSITORY = "ORDER_REPOSITORY";