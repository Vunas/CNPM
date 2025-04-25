import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

interface JwtUser {
  sub: string;
  username: string;
  role?: string;
}

interface JwtRequest extends Request {
  user: JwtUser;
}

@Controller('auth')
// @UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: JwtRequest) {
    return this.authService.getAccountByID(req.user.sub);
  }
}
