import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    console.log('🚀 JwtStrategy loaded!');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
    });
  }

  validate(payload: JwtPayload) {
    console.log('Payload nhận được:', payload);
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return { userId: payload.sub, username: payload.username };
  }
}
