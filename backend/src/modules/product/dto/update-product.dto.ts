import { IsOptional, IsString, IsDecimal, Length } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;

  @IsOptional()
  categoryId?: string;

  @IsOptional()
  restaurantId?: string;

  @IsOptional()
  status?: 'Available' | 'Out of Stock';

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  isActive?: number;
}
