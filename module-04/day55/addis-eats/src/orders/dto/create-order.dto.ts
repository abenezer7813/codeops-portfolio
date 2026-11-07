import { IsString, IsInt, Min, Max, IsIn, Matches, IsOptional } from "class-validator";
import type { Area } from "../index.js";

export class CreateOrderDto {
  @IsString()
  customer!: string;

  @IsIn(["Bole", "Kazanchis", "Piassa", "Megenagna"])
  area!: Area;

  @IsInt() @Min(1) @Max(1_000_000)
  totalSantim!: number;

  @IsOptional()
  @Matches(/^(?:\+251|0)9\d{8}$/, { message: "phone must be a valid TeleBirr number" })
  phone?: string;
}