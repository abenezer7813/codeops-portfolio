import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service.js';
import { RestaurantsController } from './restaurants.controller.js';
import { InMemoryRestaurantRepository, RESTAURANT_REPOSITORY } from './restaurants.repository.js';
import { SEED } from './seed-restaurants.js';

@Module({
  controllers: [RestaurantsController],
  providers: [RestaurantsService,
    {
      provide:RESTAURANT_REPOSITORY,
      useFactory:()=>new InMemoryRestaurantRepository(SEED)
    }
  ],
  exports: [RestaurantsService]
})
export class RestaurantsModule {}
