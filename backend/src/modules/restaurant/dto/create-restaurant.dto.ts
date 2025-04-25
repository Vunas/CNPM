import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 255)
  address: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  phone?: string;

  @IsOptional()
  status?: number;
}
