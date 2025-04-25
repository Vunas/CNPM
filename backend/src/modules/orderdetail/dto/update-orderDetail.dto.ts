import {
  IsOptional,
  IsUUID,
  IsInt,
  IsDecimal,
  IsString,
} from 'class-validator';

export class UpdateOrderDetailDto {
  @IsOptional()
  @IsUUID()
  orderId?: string;

  @IsOptional()
  @IsUUID()
  productId?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsDecimal()
  price?: number;

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
