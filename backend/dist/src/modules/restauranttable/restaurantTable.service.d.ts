import { Repository } from 'typeorm';
import { RestaurantTable } from './restaurantTable.entity';
import { CreateRestaurantTableDto } from './dto/create-restaurantTable.dto';
import { UpdateRestaurantTableDto } from './dto/update-restaurantTable.dto';
export declare class RestaurantTableService {
    private readonly restaurantTableRepository;
    constructor(restaurantTableRepository: Repository<RestaurantTable>);
    create(createRestaurantTableDto: CreateRestaurantTableDto): Promise<RestaurantTable>;
    findAll(): Promise<RestaurantTable[]>;
    findOne(id: string): Promise<RestaurantTable>;
    update(id: string, updateRestaurantTableDto: UpdateRestaurantTableDto): Promise<RestaurantTable>;
    updateStatus(id: string, newStatus: number): Promise<RestaurantTable>;
    softDelete(id: string): Promise<void>;
}
