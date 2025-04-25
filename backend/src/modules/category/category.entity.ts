import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string | null;

  @Column({ default: 1 })
  status: number;
}
