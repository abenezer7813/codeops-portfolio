import { Inject, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto.js';
import { RestaurantNotFoundError } from './restaurant.errors.js';
import type { Area, Restaurant } from './restaurant.types.js';
import { RESTAURANT_REPOSITORY, type RestaurantRepository } from './restaurants.repository.js';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY) private readonly repo: RestaurantRepository,
  ) {}

  create(dto: CreateRestaurantDto): Restaurant {
    return this.repo.save({
      name: dto.name,
      area: dto.area,
      isOpen: dto.isOpen ?? true,
    });
  }

  findAll(area?: Area): Restaurant[] {
    const rows = this.repo.all();
    return area ? rows.filter((r) => r.area === area) : rows;
  }

  findOne(id: number): Restaurant {
    const hit = this.repo.byId(id);
    if (!hit) throw new RestaurantNotFoundError(id);
    return hit;
  }
}
