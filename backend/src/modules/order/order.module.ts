import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderDetail } from '../orderdetail/orderDetail.entity';
import { Restaurant } from '../restaurant/restaurant.entity';
import { RestaurantTable } from '../restauranttable/restaurantTable.entity';
import { Product } from '../product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
    TypeOrmModule.forFeature([Restaurant]),
    TypeOrmModule.forFeature([RestaurantTable]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
