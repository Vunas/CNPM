import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
  ) {}

  // Create a new order detail
  async create(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetail> {
    const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
    return await this.orderDetailRepository.save(orderDetail);
  }

  // Get all order details
  async findAll(): Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find({
      relations: ['order', 'product'], // Load relationships if necessary
    });
  }

  // Get an order detail by ID
  async findOne(id: string): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailRepository.findOne({
      where: { orderDetailId: id },
      relations: ['order', 'product'], // Include related entities
    });
    if (!orderDetail) {
      throw new Error(`OrderDetail with ID ${id} not found`);
    }
    return orderDetail;
  }

  // Update an order detail
  async update(
    id: string,
    updateOrderDetailDto: UpdateOrderDetailDto,
  ): Promise<OrderDetail> {
    await this.orderDetailRepository.update(id, updateOrderDetailDto);
    return this.findOne(id);
  }

  // Soft-delete an order detail (set status to inactive)
  async softDelete(id: string): Promise<void> {
    await this.orderDetailRepository.update(id, { status: 0 });
  }
}