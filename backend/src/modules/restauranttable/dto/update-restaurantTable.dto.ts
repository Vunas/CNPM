import { IsOptional, IsInt, IsString, Length, IsUUID } from 'class-validator';

export class UpdateRestaurantTableDto {
  @IsOptional()
  @IsInt()
  tableNumber?: number;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  qrCode?: string;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @IsOptional()
  @IsInt()
  status?: number;
}
