import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { VnPayService } from './vnpay.service';

@Controller('vnpay')
export class VnPayController {
  constructor(private readonly vnpayService: VnPayService){}
  
  @Get()
  getBank(){
      return this.vnpayService.getBankList();
  }
 
  @Get('create')
  createPayment(
    @Query('orderId') orderId: string,
    @Query('amount') amount: string,
    @Query('created') created: string, // optional
    @Query('returnUrl') returnUrl: string,
  ) {
    const createdDate = created ? new Date(created) : new Date();
    try {
      const paymentUrl = this.vnpayService.createPaymentUrl(
        orderId,
        parseInt(amount),
        createdDate,
        returnUrl,
      );
      return { paymentUrl };  // Return payment URL in JSON response
    } catch (error) {
      console.error('Error creating payment URL:', error);
      throw new Error('Error creating payment URL');
    }
  }
}
