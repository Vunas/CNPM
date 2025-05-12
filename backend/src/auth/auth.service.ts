import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/modules/account/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AccountService } from 'src/modules/account/account.service';
import { JwtPayload } from './types/jwt-payload.type';
import axios from 'axios';

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
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      }),
    };
  }

  async loginWithGoogle(idToken: string): Promise<{ accessToken: string }> {
    if (!idToken || typeof idToken !== 'string') {
      throw new Error('Google idToken is missing or invalid!');
    }

    interface GoogleApiResponse {
      email: string;
      email_verified: boolean;
      aud: string;
    }

    const googleApiUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;

    try {
      const response = await axios.get(googleApiUrl);
      const data = <GoogleApiResponse>response.data;

      if (!data) {
        throw new Error('Not found data');
      }

      if (data.aud !== process.env.GOOGLE_CLIENT_ID) {
        throw new UnauthorizedException('Invalid token audience');
      }

      if (!data.email_verified) {
        throw new UnauthorizedException('Email not verified by Google');
      }

      const account = await this.accountRepository.findOne({
        where: { email: data.email, status: 1 },
        relations: ['restaurant'],
      });

      if (!account) {
        throw new UnauthorizedException('Account not found');
      }

      const payload: JwtPayload = {
        username: account.username,
        sub: account.accountId,
        role: account.role,
        restaurantID: account.restaurant?.restaurantId,
      };

      return {
        accessToken: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
          expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        }),
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
        },
      );

      const newAccessToken = await this.jwtService.signAsync(
        { username: payload.username, sub: payload.sub, role: payload.role },
        {
          secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
          expiresIn: '1h',
        },
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
    const account = await this.accountService.findOne(accountId);

    if (!account) {
      throw new UnauthorizedException({
        message: 'Account not found',
        hint: 'Make sure the account ID is correct',
      });
    }

    return {
      status: 'success',
      data: account,
    };
  }
}
