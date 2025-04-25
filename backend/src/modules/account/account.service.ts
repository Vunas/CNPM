import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
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
    await this.accountRepository.update(id, updateAccountDto);
    return this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.accountRepository.update(id, { status: 0 });
  }
}
