import { Module } from '@nestjs/common';
import { VnpayModule } from 'nestjs-vnpay';
import { ignoreLogger } from 'vnpay';
import { HashAlgorithm } from 'vnpay';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    VnpayModule.register({
      tmnCode: 'YOUR_TMN_CODE',
      secureSecret: 'YOUR_SECURE_SECRET',
      vnpayHost: 'https://sandbox.vnpayment.vn',

      // Cấu hình tùy chọn
      testMode: true, // Chế độ test (ghi đè vnpayHost thành sandbox nếu là true)
      hashAlgorithm: HashAlgorithm.SHA512, // Thuật toán mã hóa
      enableLog: true, // Bật/tắt ghi log
      loggerFn: ignoreLogger, // Hàm xử lý log tùy chỉnh
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class VnPayModule {}
