import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
import { InMemoryOrderRepository } from './index.js';
import { ORDER_REPOSITORY } from './order.repository.js';

@Module({
  controllers: [OrdersController],
  providers: [ OrdersService,
  { provide: ORDER_REPOSITORY, useClass: InMemoryOrderRepository },]
})
export class OrdersModule {}
