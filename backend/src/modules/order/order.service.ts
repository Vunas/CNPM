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

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<{ success: boolean; data: Order | null; error?: string }> {
    try {
      const order = this.orderRepository.create(createOrderDto);
      const savedOrder = await this.orderRepository.save(order);
      return { success: true, data: savedOrder };
    } catch (error) {
      console.error('Error creating order:', error);
      return {
        success: false,
        data: null,
        error: (error as Error).message || 'Failed to create order',
      };
    }
  }

  async createOrderWithDetails(
    createOrderDto: CreateOrderDto,
    createOrderDetailDtos: CreateOrderDetailDto[],
  ): Promise<{ success: boolean; data: Order | null; error?: string }> {
    if(createOrderDto.restaurantId === null){
      return {
        success: false,
        data: null,
        error: `Restaurant with ID ${createOrderDto.restaurantId} not found`,
      };
    }
    try {
      const restaurant = await this.restaurantRepository.findOneBy({
        restaurantId: createOrderDto.restaurantId,
      });

      console.log(restaurant)
      console.log(createOrderDto.restaurantId)

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

  async findAll(): Promise<{
    success: boolean;
    data: Order[];
    error?: string;
  }> {
    try {
      const orders = await this.orderRepository.find({
        relations: ['restaurantTable', 'restaurant', 'account'],
      });
      return { success: true, data: orders };
    } catch (error) {
      console.error('Error fetching all orders:', error);

      return {
        success: false,
        data: [],
        error: (error as Error).message || 'Failed to fetch all orders',
      };
    }
  }

  async findOne(
    id: string,
  ): Promise<{ success: boolean; data: Order | null; error?: string }> {
    try {
      const order = await this.orderRepository.findOne({
        where: { orderId: id },
        relations: ['restaurantTable', 'restaurant', 'account'],
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return { success: true, data: order };
    } catch (error) {
      console.error(`Error fetching order with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        return { success: false, data: null, error: error.message };
      }

      return {
        success: false,
        data: null,
        error:
          (error as Error).message || `Failed to fetch order with ID ${id}`,
      };
    }
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<{ success: boolean; data: Order | null; error?: string }> {
    try {
      const existingOrder = await this.orderRepository.findOneBy({
        orderId: id,
      });
      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      await this.orderRepository.update(id, updateOrderDto);
      const updatedOrder = await this.orderRepository.findOneBy({
        orderId: id,
      });
      return { success: true, data: updatedOrder || null };
    } catch (error) {
      console.error(`Error updating order with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        return { success: false, data: null, error: error.message };
      }
      return {
        success: false,
        data: null,
        error:
          (error as Error).message || `Failed to update order with ID ${id}`,
      };
    }
  }

  async softDelete(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const existingOrder = await this.orderRepository.findOneBy({
        orderId: id,
      });
      if (!existingOrder) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      await this.orderRepository.update(id, { status: 0 });
      return { success: true };
    } catch (error) {
      console.error(`Error soft-deleting order with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        return { success: false, error: error.message };
      }
      return {
        success: false,
        error:
          (error as Error).message ||
          `Failed to soft-delete order with ID ${id}`,
      };
    }
  }
}
