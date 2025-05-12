import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find({ where: { status: Not(0) } });
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOneBy({
      restaurantId: id,
    });
    if (!restaurant) {
      throw new Error(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    await this.restaurantRepository.update(id, updateRestaurantDto);
    return this.findOne(id);
  }

  // async delete(id: string): Promise<void> {
  //   await this.restaurantRepository.delete(id);
  // }

  async softDelete(id: string): Promise<void> {
    await this.restaurantRepository.update(id, { status: 0 });
  }
}
