import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Restaurant } from '../restaurant/restaurant.entity';
export declare class AccountService {
    private readonly accountRepository;
    private readonly restaurantRepository;
    constructor(accountRepository: Repository<Account>, restaurantRepository: Repository<Restaurant>);
    isUsernameTaken(username: string): Promise<boolean>;
    isEmailTaken(email: string): Promise<boolean>;
    isPhoneTaken(phone: string): Promise<boolean>;
    create(createAccountDto: CreateAccountDto): Promise<Account>;
    findAll(): Promise<Account[]>;
    findOne(id: string): Promise<Account>;
    findOneByUsername(username: string): Promise<Account>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account>;
    lock(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
}
