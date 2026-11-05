import { Inject, Injectable } from '@nestjs/common';

import { OrderNotFoundError, type Area, type Order  ,} from './index.js';
import e from 'express';
import { ORDER_REPOSITORY,type OrderRepository } from './order.repository.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
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
findAll(area?:string):Order[]{
    const orders=this.repo.all()
     if (!area) return orders;
    const ordersInLocation=orders.filter((o)=>o.area===area)
    return ordersInLocation

}

create(dto: CreateOrderDto): Order {
  return this.repo.save({ ...dto, status: "PENDING" ,dishes:[{name:"Taco",priceSantim:39900}]});
}
  feesByArea(): Record<Area, number> {
    return { Bole: 4000, Kazanchis: 6000, Piassa: 6000, Megenagna: 6000 };
  }

  summarise<K extends keyof Order>( key: K): Order[K][] {
    return this.repo.all().map((o) => o[key]);
  }
}