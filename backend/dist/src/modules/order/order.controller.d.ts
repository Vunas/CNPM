import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailDto } from '../orderdetail/dto/create-orderDetail.dto';
import { Order } from './order.entity';
export declare class OrderController {
    private readonly orderService;
    private readonly logger;
    constructor(orderService: OrderService);
    createOrderWithDetails({ currentOrder, order, orderDetails, }: {
        currentOrder: Order;
        order: CreateOrderDto;
        orderDetails: CreateOrderDetailDto[];
    }): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    softDelete(id: string): Promise<void>;
}
