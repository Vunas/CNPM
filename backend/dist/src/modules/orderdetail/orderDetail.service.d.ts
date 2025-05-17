import { Repository } from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';
export declare class OrderDetailService {
    private readonly orderDetailRepository;
    constructor(orderDetailRepository: Repository<OrderDetail>);
    create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail>;
    findAll(): Promise<OrderDetail[]>;
    findOne(id: string): Promise<OrderDetail>;
    update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<OrderDetail>;
    softDelete(id: string): Promise<void>;
    findByOrderId(orderId: string): Promise<any[]>;
}
