import { Controller, Get, Query, Param, Post, Body } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto.js";
import { OrdersService } from "./orders.service.js";

@Controller("orders")
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Get()
  findAll(@Query("area") area?: string) { return this.orders.findAll(area); }

  @Get(":id")
  findOne(@Param("id") id: string) { return this.orders.find(Number(id)); }

  @Post()
  create(@Body() dto: CreateOrderDto) { return this.orders.create(dto); }
}