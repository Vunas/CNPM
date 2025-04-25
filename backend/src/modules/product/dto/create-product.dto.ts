import {
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

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
