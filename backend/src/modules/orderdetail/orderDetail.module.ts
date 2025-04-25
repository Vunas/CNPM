import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './orderDetail.entity';
import { OrderDetailService } from './orderDetail.service';
import { OrderDetailController } from './orderDetail.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  providers: [OrderDetailService],
  controllers: [OrderDetailController],
})
export class OrderDetailModule {}
