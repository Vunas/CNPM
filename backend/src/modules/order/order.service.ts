import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  // Get all orders
  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['restaurantTable', 'restaurant', 'account'], // Load relationships if necessary
    });
  }

  // Get an order by ID
  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
      relations: ['restaurantTable', 'restaurant', 'account'], // Include related entities
    });
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }

  // Update an existing order
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.orderRepository.update(id, updateOrderDto);
    return this.findOne(id);
  }

  // Soft-delete an order (set status to inactive)
  async softDelete(id: string): Promise<void> {
    await this.orderRepository.update(id, { status: 0 });
  }
}
