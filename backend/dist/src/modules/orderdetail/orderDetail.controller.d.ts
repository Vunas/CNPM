import { OrderDetailService } from './orderDetail.service';
import { CreateOrderDetailDto } from './dto/create-orderDetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderDetail.dto';
export declare class OrderDetailController {
    private readonly orderDetailService;
    constructor(orderDetailService: OrderDetailService);
    create(createOrderDetailDto: CreateOrderDetailDto): Promise<import("./orderDetail.entity").OrderDetail>;
    findAll(): Promise<import("./orderDetail.entity").OrderDetail[]>;
    findOne(id: string): Promise<import("./orderDetail.entity").OrderDetail>;
    findByOrderId(orderId: string): Promise<any[]>;
    update(id: string, updateOrderDetailDto: UpdateOrderDetailDto): Promise<import("./orderDetail.entity").OrderDetail>;
    softDelete(id: string): Promise<void>;
}
