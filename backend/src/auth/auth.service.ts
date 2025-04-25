import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/modules/account/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async login(loginDto: {
    username: string;
    password: string;
  }): Promise<{ accessToken: string }> {
    const account = await this.accountRepository.findOne({
      where: { username: loginDto.username, status: 1 },
      relations: ['restaurant'],
    });

    if (!account) {
      throw new UnauthorizedException('Invalid username or password');
    }

    if (
      typeof loginDto.password !== 'string' ||
      typeof account.passwordHash !== 'string'
    ) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = (await bcrypt.compare(
      loginDto.password,
      account.passwordHash,
    )) as boolean;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      username: account.username,
      sub: account.accountId,
      role: account.role,
      restaurantID: account.restaurant?.restaurantId, // Sử dụng optional chaining để tránh lỗi nếu restaurant là null
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
