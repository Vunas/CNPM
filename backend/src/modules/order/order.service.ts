import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDetail } from '../orderdetail/orderDetail.entity';
import { CreateOrderDetailDto } from '../orderdetail/dto/create-orderDetail.dto';
import { Restaurant } from '../restaurant/restaurant.entity';
import { RestaurantTable } from '../restauranttable/restaurantTable.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(RestaurantTable)
    private readonly restaurantTableRepository: Repository<RestaurantTable>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Create a new order
  async createOrderWithDetails(
    createOrderDto: CreateOrderDto,
    createOrderDetailDtos: CreateOrderDetailDto[],
  ): Promise<{ success: boolean; data: Order | null; error?: string }> {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({
        restaurantId: createOrderDto.restaurantId,
      });

      if (!restaurant) {
        return {
          success: false,
          data: null,
          error: `Restaurant with ID ${createOrderDto.restaurantId} not found`,
        };
      }

      const restaurantTable = await this.restaurantTableRepository.findOneBy({
        tableId: createOrderDto.tableId,
      });

      if (!restaurantTable) {
        return {
          success: false,
          data: null,
          error: `RestaurantTable with ID ${createOrderDto.tableId} not found`,
        };
      }

      const order = this.orderRepository.create({
        ...createOrderDto,
        restaurant: restaurant,
        restaurantTable: restaurantTable,
      });

      const savedOrder = await this.orderRepository.save(order);

      const orderDetails: OrderDetail[] = [];
      for (const dto of createOrderDetailDtos) {
        const product = await this.productRepository.findOneBy({
          productID: dto.productId,
        });
        if (!product) {
          return {
            success: false,
            data: null,
            error: `Product with ID ${dto.productId} not found`,
          };
        }
        const orderDetail = this.orderDetailRepository.create({
          ...dto,
          order: savedOrder,
          product: product,
        });
        orderDetails.push(orderDetail);
      }
      await this.orderDetailRepository.save(orderDetails);

      return { success: true, data: savedOrder };
    } catch (error) {
      console.error('Error creating order with details:', error);
      return {
        success: false,
        data: null,
        error:
          (error as Error).message || 'Failed to create order with details',
      };
    }
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
