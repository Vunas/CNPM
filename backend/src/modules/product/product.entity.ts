import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productID: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'CategoryID' })
  category: Category | null;

  @ManyToOne(() => Restaurant, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'RestaurantID' })
  restaurant: Restaurant | null;

  @Column({
    type: 'enum',
    enum: ['Available', 'Out of Stock'],
    default: 'Available',
  })
  status: 'Available' | 'Out of Stock';

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;

  @Column({ default: 1 })
  isActive: number;
}
