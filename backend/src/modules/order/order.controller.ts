import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailDto } from '../orderdetail/dto/create-orderDetail.dto';
import { Logger } from '@nestjs/common';
import { Order } from './order.entity';

@Controller('order')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);
  constructor(private readonly orderService: OrderService) {}

  // Create a new order with order details
  @Post()
  async createOrderWithDetails(
    @Body()
    {
      currentOrder,
      order,
      orderDetails,
    }: {
      currentOrder: Order;
      order: CreateOrderDto;
      orderDetails: CreateOrderDetailDto[];
    },
  ) {
    this.logger.log('createOrderDto received:', JSON.stringify(order));
    this.logger.log(
      'createOrderDetailDtos received:',
      JSON.stringify(orderDetails),
    );
    return this.orderService.createOrderWithDetails(
      currentOrder,
      order,
      orderDetails,
    );
  }

  // Get all orders
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  // Get a specific order by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  // Update an order by ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  // Soft-delete an order by ID
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.orderService.softDelete(id);
  }
}
