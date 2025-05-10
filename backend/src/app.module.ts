import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database.config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { AccountModule } from './modules/account/account.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { RestaurantTableModule } from './modules/restauranttable/restaurantTable.module';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/orderdetail/orderDetail.module';
import { AuthModule } from './auth/auth.module';
import { VnPayModule } from './modules/vnpay/vnpay.module';
import { UploadModule } from './uploads/upload.module';
import { FileCleanupModule } from './utils/FileCleanUp.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
    }),
    RestaurantModule,
    AccountModule,
    CategoryModule,
    ProductModule,
    RestaurantTableModule,
    OrderModule,
    OrderDetailModule,
    AuthModule,
    VnPayModule,
    UploadModule,
    FileCleanupModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConfigService],
})
export class AppModule {}
