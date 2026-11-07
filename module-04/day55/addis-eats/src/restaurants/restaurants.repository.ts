import { Injectable } from "@nestjs/common";
import type { Restaurant } from "./restaurant.types.js";
import { SEED } from "./seed-restaurants.js";

export const RESTAURANT_REPOSITORY = "RESTAURANT_REPOSITORY";

export interface RestaurantRepository {
    
  byId(id: number): Restaurant | undefined;
  all(): Restaurant[];
  save(restaurant: Omit<Restaurant, "id">): Restaurant;
}

@Injectable()
export class InMemoryRestaurantRepository implements RestaurantRepository {
  private readonly restaurants = new Map<number, Restaurant>(
    SEED.map((r) => [r.id, r]),
  );
  private nextId = Math.max(0, ...SEED.map((r) => r.id)) + 1;
constructor(seed: Restaurant[] = []) {
    for (const r of seed) {
      this.restaurants.set(r.id, r);
      this.nextId = Math.max(this.nextId, r.id + 1);
    }
  }
  byId(id: number): Restaurant | undefined {
    return this.restaurants.get(id);
  }

  all(): Restaurant[] {
    return [...this.restaurants.values()];
  }

  save(restaurant: Omit<Restaurant, "id">): Restaurant {
    const saved: Restaurant = { ...restaurant, id: this.nextId++ };
    this.restaurants.set(saved.id, saved);
    return saved;
  }
}