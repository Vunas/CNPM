import { Injectable } from '@nestjs/common';
import { VnpayService } from 'nestjs-vnpay';
import { dateFormat, ProductCode, VnpLocale } from 'vnpay';
@Injectable()
export class VnPayService {
  constructor(private readonly vnpayService: VnpayService) {}

  async getBankList() {
    return this.vnpayService.getBankList();
  }
  /* ... các phương thức khác ... */
  createPaymentUrl(orderId: string, amount: number, created: Date, home: string) {
    const expire = created
    expire.setMinutes(expire.getMinutes()+1)
    return this.vnpayService.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: '13.160.92.202',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: 'Thanh toan don hang',
      vnp_OrderType: ProductCode.Cuisine,
      vnp_ReturnUrl: home,
      vnp_Locale: VnpLocale.EN,
      vnp_CreateDate: dateFormat(created),
      vnp_ExpireDate: dateFormat(expire),
    });
  }
}