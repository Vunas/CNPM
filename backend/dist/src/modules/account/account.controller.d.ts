import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    create(createAccountDto: CreateAccountDto): Promise<import("./account.entity").Account>;
    findAll(): Promise<import("./account.entity").Account[]>;
    findOne(id: string): Promise<import("./account.entity").Account>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<import("./account.entity").Account>;
    Lock(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
}
