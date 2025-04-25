import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantTable } from './restaurantTable.entity';
import { CreateRestaurantTableDto } from './dto/create-restaurantTable.dto';
import { UpdateRestaurantTableDto } from './dto/update-restaurantTable.dto';

@Injectable()
export class RestaurantTableService {
  constructor(
    @InjectRepository(RestaurantTable)
    private readonly restaurantTableRepository: Repository<RestaurantTable>,
  ) {}

  async create(
    createRestaurantTableDto: CreateRestaurantTableDto,
  ): Promise<RestaurantTable> {
    const table = this.restaurantTableRepository.create(
      createRestaurantTableDto,
    );
    return await this.restaurantTableRepository.save(table);
  }

  async findAll(): Promise<RestaurantTable[]> {
    return await this.restaurantTableRepository.find();
  }

  async findOne(id: string): Promise<RestaurantTable> {
    const table = await this.restaurantTableRepository.findOneBy({
      tableId: id,
    });
    if (!table) {
      throw new Error(`Table with ID ${id} not found`);
    }
    return table;
  }

  async update(
    id: string,
    updateRestaurantTableDto: UpdateRestaurantTableDto,
  ): Promise<RestaurantTable> {
    await this.restaurantTableRepository.update(id, updateRestaurantTableDto);
    return this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.restaurantTableRepository.update(id, { status: 0 });
  }
}
