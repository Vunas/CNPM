import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';
import { Account } from '../account/account.entity';
import { RestaurantTable } from '../restauranttable/restaurantTable.entity';

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  orderId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Confirmed','Processing','Finished', 'Cancelled'],
    default: 'Pending',
  })
  orderStatus: 'Pending' | 'Confirmed' | 'Finished' | 'Cancelled';

  @Column({
    type: 'enum',
    enum: ['Dine-in', 'Takeaway', 'Delivery'],
    default: 'Takeaway',
  })
  orderType: 'Dine-in' | 'Takeaway' | 'Delivery';

  @Column({
    type: 'enum',
    enum: ['Cash', 'Credit Card', 'E-wallet'],
    nullable: true,
  })
  paymentMethod: 'Cash' | 'Credit Card' | 'E-wallet' | null;

  // Tạo khóa ngoại tableId riêng biệt
  @Column({ type: 'uuid', nullable: true })
  tableId: string | null;

  @ManyToOne(() => RestaurantTable, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tableId', referencedColumnName: 'tableId' }) 
  restaurantTable: RestaurantTable | null;

  @Column({ type: 'varchar', length: 50, nullable: false })
  customerContact: string;

  @Column({ type: 'uuid', nullable: true })
  accountId: string | null;

  @ManyToOne(() => Account, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'accountId', referencedColumnName: 'accountId' })
  account: Account | null;

  @Column({ type: 'uuid', nullable: false })
  restaurantId: string;

  @ManyToOne(() => Restaurant, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'restaurantId' })
  restaurant: Restaurant;

  @Column({ type: 'int', default: 1 })
  status: number;
}
