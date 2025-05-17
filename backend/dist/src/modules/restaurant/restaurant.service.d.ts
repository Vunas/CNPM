import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantService {
    private readonly restaurantRepository;
    constructor(restaurantRepository: Repository<Restaurant>);
    findAll(): Promise<Restaurant[]>;
    findOne(id: string): Promise<Restaurant>;
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant>;
    softDelete(id: string): Promise<void>;
}
