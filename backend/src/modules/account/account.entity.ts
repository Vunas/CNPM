import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity('Account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  accountId: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  passwordHash: string;

  @Column({ type: 'enum', enum: ['Admin', 'Employee', 'Kitchen'] })
  role: 'Admin' | 'Employee' | 'Kitchen';

  @Column({ length: 100, unique: true, nullable: true })
  email: string;

  @Column({ length: 15, unique: true, nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 1 })
  status: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.restaurantId, {
    nullable: true,
  })
  @JoinColumn({ name: 'restaurantId' }) // Đặt tên cột là 'restaurantId'
  restaurant: Restaurant;
}
