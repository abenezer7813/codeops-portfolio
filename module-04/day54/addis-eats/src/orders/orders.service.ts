import { Inject, Injectable } from '@nestjs/common';

import { OrderNotFoundError, type Area, type Order  ,} from './index.js';
import e from 'express';
import { ORDER_REPOSITORY,type OrderRepository } from './order.repository.js';
@Injectable()
export class OrdersService {
 constructor(
  @Inject(ORDER_REPOSITORY) private readonly repo: OrderRepository,
) {}

  find(id: number): Order {
    const hit = this.repo.byId(id);
    if (!hit) throw new OrderNotFoundError(id);
    return hit;
  }

  feesByArea(): Record<Area, number> {
    return { Bole: 4000, Kazanchis: 6000, Piassa: 6000, Megenagna: 6000 };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repo.all().map((o) => o[key]);
  }
}