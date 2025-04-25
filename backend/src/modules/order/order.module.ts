import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
