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
  productId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Category, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category | null;

  @ManyToOne(() => Restaurant, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant | null;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;

  @Column({ default: 1 })
  status: number;
}
