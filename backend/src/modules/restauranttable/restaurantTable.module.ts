import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantTable } from './restaurantTable.entity';
import { RestaurantTableController } from './restaurantTable.controller';
import { RestaurantTableService } from './restaurantTable.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantTable])],
  providers: [RestaurantTableService],
  controllers: [RestaurantTableController],
})
export class RestaurantTableModule {}
