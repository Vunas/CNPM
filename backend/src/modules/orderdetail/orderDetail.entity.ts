import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity'; // Assuming Product entity exists

@Entity('OrderDetail')
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  orderDetailId: string;

  @Column({ type: 'uuid', nullable: false })
  orderId: string;

  @ManyToOne(() => Order, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'OrderID' })
  order: Order;

  @Column({ type: 'uuid', nullable: false })
  productId: string;

  @ManyToOne(() => Product, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ProductID' })
  product: Product;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'int', default: 1 })
  status: number;
}
