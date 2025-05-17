import { VnpayService } from 'nestjs-vnpay';
export declare class VnPayService {
    private readonly vnpayService;
    constructor(vnpayService: VnpayService);
    getBankList(): Promise<import("vnpay").Bank[]>;
    createPaymentUrl(orderId: string, amount: number, created: Date, home: string): string;
}
