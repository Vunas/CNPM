import { Order } from '../order/order.entity';
export declare class Feedback {
    feedbackId: string;
    order: Order;
    customerName: string;
    email: string;
    message: string;
    createdAt: Date;
    status: number;
    rating: number;
}
