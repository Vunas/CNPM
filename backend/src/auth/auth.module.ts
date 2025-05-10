import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountService } from 'src/modules/account/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/modules/account/account.entity';
import { Restaurant } from 'src/modules/restaurant/restaurant.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
    TypeOrmModule.forFeature([Account, Restaurant]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AccountService],
})
export class AuthModule {
  constructor() {
    console.log('✅ AuthModule initialized!');
  }
}
