"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const account_entity_1 = require("./account.entity");
const bcrypt = require("bcrypt");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
let AccountService = class AccountService {
    accountRepository;
    restaurantRepository;
    constructor(accountRepository, restaurantRepository) {
        this.accountRepository = accountRepository;
        this.restaurantRepository = restaurantRepository;
    }
    async isUsernameTaken(username) {
        const account = await this.accountRepository.findOneBy({ username });
        return !!account;
    }
    async isEmailTaken(email) {
        const account = await this.accountRepository.findOneBy({ email });
        return !!account;
    }
    async isPhoneTaken(phone) {
        const account = await this.accountRepository.findOneBy({ phone });
        return !!account;
    }
    async create(createAccountDto) {
        const { username, email, phone, passwordHash, restaurantId } = createAccountDto;
        const restaurant = await this.restaurantRepository.findOneBy({
            restaurantId: restaurantId,
        });
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant with ID ${createAccountDto.restaurantId} not found`);
        }
        if (await this.isUsernameTaken(username)) {
            throw new common_1.BadRequestException(`Username "${username}" is already taken.`);
        }
        if (email && (await this.isEmailTaken(email))) {
            throw new common_1.BadRequestException(`Email "${email}" is already registered.`);
        }
        if (phone && (await this.isPhoneTaken(phone))) {
            throw new common_1.BadRequestException(`Phone number "${phone}" is already registered.`);
        }
        if (passwordHash) {
            const saltOrRounds = 10;
            createAccountDto.passwordHash = await bcrypt.hash(passwordHash, saltOrRounds);
        }
        const account = this.accountRepository.create({
            ...createAccountDto,
            restaurant,
        });
        return await this.accountRepository.save(account);
    }
    async findAll() {
        return await this.accountRepository.find({
            relations: ['restaurant'],
            where: { status: (0, typeorm_1.Not)(0) },
        });
    }
    async findOne(id) {
        const account = await this.accountRepository.findOneBy({ accountId: id });
        if (!account) {
            throw new common_1.BadRequestException(`Account with ID ${id} not found`);
        }
        return account;
    }
    async findOneByUsername(username) {
        const account = await this.accountRepository.findOneBy({
            username: username,
        });
        if (!account) {
            throw new common_1.BadRequestException(`Account with Username ${username} not found`);
        }
        return account;
    }
    async update(id, updateAccountDto) {
        const { username, email, phone, passwordHash, restaurantId } = updateAccountDto;
        const restaurant = await this.restaurantRepository.findOneBy({
            restaurantId: restaurantId,
        });
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurant with ID ${updateAccountDto.restaurantId} not found`);
        }
        if (username && (await this.isUsernameTaken(username))) {
            const existingAccount = await this.accountRepository.findOneBy({
                username,
            });
            if (existingAccount && existingAccount.accountId !== id) {
                throw new common_1.BadRequestException(`Username "${username}" is already taken.`);
            }
        }
        if (email && (await this.isEmailTaken(email))) {
            const existingAccount = await this.accountRepository.findOneBy({ email });
            if (existingAccount && existingAccount.accountId !== id) {
                throw new common_1.BadRequestException(`Email "${email}" is already registered.`);
            }
        }
        if (phone && (await this.isPhoneTaken(phone))) {
            const existingAccount = await this.accountRepository.findOneBy({ phone });
            if (existingAccount && existingAccount.accountId !== id) {
                throw new common_1.BadRequestException(`Phone number "${phone}" is already registered.`);
            }
        }
        if (passwordHash) {
            const saltOrRounds = 10;
            updateAccountDto.passwordHash = await bcrypt.hash(passwordHash, saltOrRounds);
        }
        await this.accountRepository.save(updateAccountDto);
        return this.findOne(id);
    }
    async lock(id) {
        const account = await this.accountRepository.findOneBy({ accountId: id });
        if (!account) {
            throw new common_1.NotFoundException(`Account with ID ${id} not found`);
        }
        if (account.status === 2) {
            await this.accountRepository.update(id, { status: 1 });
            return;
        }
        await this.accountRepository.update(id, { status: 2 });
    }
    async softDelete(id) {
        await this.accountRepository.update(id, { status: 0 });
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(account_entity_1.Account)),
    __param(1, (0, typeorm_2.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AccountService);
//# sourceMappingURL=account.service.js.map