import {
  IsOptional,
  IsUUID,
  IsEnum,
  IsDecimal,
  IsString,
  Length,
} from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsDecimal()
  totalPrice?: number;

  @IsOptional()
  @IsEnum(['Pending', 'Confirmed', 'Finished', 'Cancelled'])
  orderStatus?: 'Pending' | 'Confirmed' | 'Finished' | 'Cancelled';

  @IsOptional()
  @IsEnum(['Dine-in', 'Takeaway', 'Delivery'])
  orderType?: 'Dine-in' | 'Takeaway' | 'Delivery';

  @IsOptional()
  @IsEnum(['Cash', 'Credit Card', 'E-wallet'])
  paymentMethod?: 'Cash' | 'Credit Card' | 'E-wallet';

  @IsOptional()
  @IsUUID()
  tableId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  customerContact?: string;

  @IsOptional()
  @IsUUID()
  accountId?: string;

  @IsOptional()
  @IsUUID()
  restaurantId?: string;

  @IsOptional()
  status?: number;
}
