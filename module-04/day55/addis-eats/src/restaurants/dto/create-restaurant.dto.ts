// src/restaurants/dto/create-restaurant.dto.ts
import { IsBoolean, IsIn, IsOptional, IsString, Length } from "class-validator";
import { AREAS, type Area } from "../restaurant.types.js";


export class CreateRestaurantDto {
  @IsString()
  @Length(2, 80)
  name!: string;

  @IsIn(AREAS)
  area!: Area;

  @IsOptional()
  @IsBoolean()
  isOpen?: boolean;
}