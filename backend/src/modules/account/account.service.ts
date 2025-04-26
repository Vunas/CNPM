import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async isUsernameTaken(username: string): Promise<boolean> {
    const account = await this.accountRepository.findOneBy({ username });
    return !!account;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const account = await this.accountRepository.findOneBy({ email });
    return !!account;
  }

  async isPhoneTaken(phone: string): Promise<boolean> {
    const account = await this.accountRepository.findOneBy({ phone });
    return !!account;
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { username, email, phone, passwordHash } = createAccountDto;

    if (await this.isUsernameTaken(username)) {
      throw new Error(`Username "${username}" is already taken.`);
    }

    if (email && (await this.isEmailTaken(email))) {
      throw new Error(`Email "${email}" is already registered.`);
    }

    if (phone && (await this.isPhoneTaken(phone))) {
      throw new Error(`Phone number "${phone}" is already registered.`);
    }

    if (passwordHash) {
      const saltOrRounds = 10;
      createAccountDto.passwordHash = await bcrypt.hash(
        passwordHash,
        saltOrRounds,
      );
    }

    const account = this.accountRepository.create(createAccountDto);
    return await this.accountRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.find({ relations: ['restaurant'] });
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ accountId: id });
    if (!account) {
      throw new Error(`Account with ID ${id} not found`);
    }
    return account;
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    const { username, email, phone, passwordHash } = updateAccountDto;

    if (username && (await this.isUsernameTaken(username))) {
      const existingAccount = await this.accountRepository.findOneBy({
        username,
      });
      if (existingAccount && existingAccount.accountId !== id) {
        throw new Error(`Username "${username}" is already taken.`);
      }
    }

    if (email && (await this.isEmailTaken(email))) {
      const existingAccount = await this.accountRepository.findOneBy({ email });
      if (existingAccount && existingAccount.accountId !== id) {
        throw new Error(`Email "${email}" is already registered.`);
      }
    }

    if (phone && (await this.isPhoneTaken(phone))) {
      const existingAccount = await this.accountRepository.findOneBy({ phone });
      if (existingAccount && existingAccount.accountId !== id) {
        throw new Error(`Phone number "${phone}" is already registered.`);
      }
    }

    if (passwordHash) {
      const saltOrRounds = 10;
      updateAccountDto.passwordHash = await bcrypt.hash(
        passwordHash,
        saltOrRounds,
      );
    }

    await this.accountRepository.update(id, updateAccountDto);
    return this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.accountRepository.update(id, { status: 0 });
  }
}
