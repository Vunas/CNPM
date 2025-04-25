import { IsNotEmpty, IsUUID, IsInt, IsString, Length } from 'class-validator';

export class CreateRestaurantTableDto {
  @IsNotEmpty()
  @IsInt()
  tableNumber: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  qrCode: string;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @IsNotEmpty()
  @IsInt()
  status: number;
}
