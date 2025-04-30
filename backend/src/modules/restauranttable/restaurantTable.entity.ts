import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity('RestaurantTable')
export class RestaurantTable {
  @PrimaryGeneratedColumn('uuid')
  tableId: string;

  @Column({ type: 'int' })
  tableNumber: number;

  @Column({ length: 255, nullable: true })
  qrCode: string;

  @Column({ type: 'uuid' })
  restaurantId: string; 

  @ManyToOne(() => Restaurant, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'restaurantId' })
  restaurant: Restaurant;

  @Column({ type: 'int', default: 1 })
  status: number;
}
