import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { VnPayService } from './vnpay.service';

@Controller('vnpay')
export class VnPayController {
    constructor(private readonly vnpayService: VnPayService){}
    
    @Get()
    getBank(){
        return this.vnpayService.getBankList();
    }
}
