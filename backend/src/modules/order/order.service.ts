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
    return await this.orderRepository.save(
      this.orderRepository.create(createOrderDto),
    );
  }

  async getLatestOrderByTable(tableId: string): Promise<Order | null> {
    return await this.orderRepository.findOne({
      where: { tableId },
      order: { orderDate: 'DESC' },
    });
  }

  async createOrderWithDetails(
    currentOrder: Order | null,
    createOrderDto: CreateOrderDto,
    createOrderDetailDtos: CreateOrderDetailDto[],
  ): Promise<Order> {
    const restaurant = await this.findRestaurant(createOrderDto.restaurantId);
    const restaurantTable = await this.findRestaurantTable(
      createOrderDto?.tableId || '',
    );

    await this.validateTableStatus(
      restaurantTable,
      createOrderDto?.tableId || '',
      currentOrder,
    );

    const order = await this.orderRepository.save(
      this.orderRepository.create({
        ...createOrderDto,
        restaurant,
        restaurantTable,
      }),
    );

    await this.createOrderDetails(order, createOrderDetailDtos);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['restaurantTable', 'restaurant', 'account'],
      where: { status: Not(0) },
    });
  }

  async findOne(id: string): Promise<Order> {
    return this.findOrder(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.findOrder(id);
    await this.orderRepository.update(id, updateOrderDto);
    return await this.findOrder(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.findOrder(id);
    await this.orderRepository.update(id, { status: 0 });
  }

  private async findRestaurant(restaurantId: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOneBy({
      restaurantId,
    });
    if (!restaurant)
      throw new NotFoundException(
        `Restaurant with ID ${restaurantId} not found`,
      );
    return restaurant;
  }

  private async findRestaurantTable(tableId: string): Promise<RestaurantTable> {
    const table = await this.restaurantTableRepository.findOneBy({ tableId });
    if (!table)
      throw new NotFoundException(
        `RestaurantTable with ID ${tableId} not found`,
      );
    return table;
  }

  private async validateTableStatus(
    table: RestaurantTable,
    tableId: string,
    currentOrder: Order | null,
  ): Promise<void> {
    if ([2, 4].includes(table.status)) {
      throw new BadRequestException(
        `Table ID ${tableId} is locked, please contact staff.`,
      );
    }
    if (table.status == 3) await this.validateOrder(currentOrder, tableId);
  }

  private async validateOrder(
    currentOrder: Order | null,
    tableId: string,
  ): Promise<void> {
    if (!currentOrder) {
      throw new BadRequestException(
        `Table ID ${tableId} is currently in use, please contact staff.`,
      );
    }
    if (
      currentOrder.orderId !==
      (await this.getLatestOrderByTable(tableId))?.orderId
    ) {
      throw new BadRequestException(
        `Table ID ${tableId} is currently in use, please contact staff.`,
      );
    }
  }

  private async createOrderDetails(
    order: Order,
    detailsDtos: CreateOrderDetailDto[],
  ): Promise<void> {
    const orderDetails = await Promise.all(
      detailsDtos.map(async (dto) => {
        const product = await this.productRepository.findOneBy({
          productId: dto.productId,
        });
        if (!product)
          throw new NotFoundException(
            `Product with ID ${dto.productId} not found`,
          );
        return this.orderDetailRepository.create({ ...dto, order, product });
      }),
    );
    await this.orderDetailRepository.save(orderDetails);
  }

  private async findOrder(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
      relations: ['restaurantTable', 'restaurant', 'account'],
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }
}
