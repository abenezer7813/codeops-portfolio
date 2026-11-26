import { Transform, Type } from "class-transformer";
import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class FindEventsQueryDto {
    @IsOptional()
    @IsString()
    category?: string

    @IsOptional()
    @IsString()
    location?: string

    @IsOptional()
    @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
    @IsBoolean()
    isPublished?: boolean

    @IsOptional()
    @IsIn(['eventDate', 'title'])
    sortBy?: 'eventDate' | 'title'


    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc'

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number
}