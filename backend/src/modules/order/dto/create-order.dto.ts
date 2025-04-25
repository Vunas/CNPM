import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsString,
  IsEnum,
  IsDecimal,
  Length,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDecimal()
  totalPrice: number;

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

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  customerContact: string;

  @IsOptional()
  @IsUUID()
  accountId?: string;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;

  @IsOptional()
  status?: number;
}
