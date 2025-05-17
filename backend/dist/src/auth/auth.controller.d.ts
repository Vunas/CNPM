import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { GoogleLoginDto } from './dto/google-login.dto';
interface JwtRequest extends Request {
    user: JwtPayload;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    loginWithGoogle(googleLoginDto: GoogleLoginDto): Promise<{
        accessToken: string;
    }>;
    getProfile(req: JwtRequest): Promise<{
        account: import("../modules/account/account.entity").Account;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
export {};
