import {
  IsNotEmpty,
  IsUUID,
  IsInt,
  IsDecimal,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsOptional()
  @IsDecimal()
  discount?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsInt()
  status?: number;
}
