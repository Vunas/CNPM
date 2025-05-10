import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Restaurant } from '../restaurant/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Restaurant]),
  ],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
