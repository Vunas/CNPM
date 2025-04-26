import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/modules/account/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AccountService } from 'src/modules/account/account.service';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const account = await this.accountRepository.findOne({
      where: { username: loginDto.username, status: 1 },
      relations: ['restaurant'],
    });

    if (!account) {
      throw new UnauthorizedException({
        message: 'Invalid username or password',
        hint: 'Ensure the username is correct and active',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      account.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        message: 'Invalid username or password',
        hint: 'Check your password carefully',
      });
    }

    const payload = {
      username: account.username,
      sub: account.accountId,
      role: account.role,
      restaurantID: account.restaurant?.restaurantId,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(refreshToken);

      const newAccessToken = await this.jwtService.signAsync(
        { username: payload.username, sub: payload.sub, role: payload.role },
        { expiresIn: '1h' },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException({
        message: 'Invalid or expired refresh token',
      });
    }
  }

  async getAccountByID(accountId: string) {
    // Use the accountService to find the account by ID
    const account = await this.accountService.findOne(accountId);

    // Handle case where account is not found
    if (!account) {
      throw new UnauthorizedException({
        message: 'Account not found',
        hint: 'Make sure the account ID is correct',
      });
    }

    // Return the account details in a proper structure
    return {
      status: 'success',
      data: account,
    };
  }
}
