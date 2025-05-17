import { VnPayService } from './vnpay.service';
export declare class VnPayController {
    private readonly vnpayService;
    constructor(vnpayService: VnPayService);
    getBank(): Promise<import("vnpay").Bank[]>;
    createPayment(orderId: string, amount: string, created: string, returnUrl: string): {
        paymentUrl: string;
    };
}
