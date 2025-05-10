import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Category } from '../category/category.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Restaurant])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
