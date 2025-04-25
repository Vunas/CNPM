import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('Restaurant')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  restaurantId: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 15, nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 1 })
  status: number;
}
