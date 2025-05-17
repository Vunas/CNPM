import { Order } from '../order/order.entity';
import { Product } from '../product/product.entity';
export declare class OrderDetail {
    orderDetailId: string;
    order: Order;
    product: Product;
    quantity: number;
    price: number;
    discount: number;
    notes: string;
    status: number;
}
