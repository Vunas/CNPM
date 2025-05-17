import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/modules/account/account.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { AccountService } from 'src/modules/account/account.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly accountService;
    private readonly accountRepository;
    constructor(jwtService: JwtService, accountService: AccountService, accountRepository: Repository<Account>);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
    loginWithGoogle(idToken: string): Promise<{
        accessToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    getAccountByUsername(username: string): Promise<{
        account: Account;
    }>;
}
