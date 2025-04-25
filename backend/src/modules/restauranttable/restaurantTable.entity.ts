import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity('RestaurantTable')
export class RestaurantTable {
  @PrimaryGeneratedColumn('uuid')
  tableId: string;

  @Column({ type: 'int', nullable: false })
  tableNumber: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  qrCode: string;

  @Column({ type: 'uuid', nullable: false })
  restaurantId: string;

  @ManyToOne(() => Restaurant, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'RestaurantID' })
  restaurant: Restaurant | null;

  @Column({ type: 'int', default: 1 })
  status: number;
}
