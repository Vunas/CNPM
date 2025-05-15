import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async createOrderWithDetails(
    createOrderDto: CreateOrderDto,
    createOrderDetailDtos: CreateOrderDetailDto[],
  ): Promise<Order> {
    const restaurant = await this.restaurantRepository.findOneBy({
      restaurantId: createOrderDto.restaurantId,
    });
    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID ${createOrderDto.restaurantId} not found`,
      );
    }

    const restaurantTable = await this.restaurantTableRepository.findOneBy({
      tableId: createOrderDto.tableId,
    });
    if (!restaurantTable) {
      throw new NotFoundException(
        `RestaurantTable with ID ${createOrderDto.tableId} not found`,
      );
    }

    if (restaurantTable.status == 2 || restaurantTable.status == 4) {
      throw new BadRequestException(
        `RestaurantTable with ID ${createOrderDto.tableId} is locked, please contact staff to activate.`,
      );
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      restaurant,
      restaurantTable,
    });

    const savedOrder = await this.orderRepository.save(order);

    const orderDetails: OrderDetail[] = [];
    for (const dto of createOrderDetailDtos) {
      const product = await this.productRepository.findOneBy({
        productId: dto.productId,
      });
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${dto.productId} not found`,
        );
      }

      const orderDetail = this.orderDetailRepository.create({
        ...dto,
        order: savedOrder,
        product,
      });
      orderDetails.push(orderDetail);
    }

    await this.orderDetailRepository.save(orderDetails);

    return savedOrder;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['restaurantTable', 'restaurant', 'account'],
      where: { status: Not(0) },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
      relations: ['restaurantTable', 'restaurant', 'account'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existingOrder = await this.orderRepository.findOneBy({ orderId: id });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.orderRepository.update(id, updateOrderDto);
    return await this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    const existingOrder = await this.orderRepository.findOneBy({ orderId: id });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    await this.orderRepository.update(id, { status: 0 });
  }
}
