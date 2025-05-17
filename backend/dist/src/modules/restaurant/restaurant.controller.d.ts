import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<import("./restaurant.entity").Restaurant>;
    findAll(): Promise<import("./restaurant.entity").Restaurant[]>;
    findOne(id: string): Promise<import("./restaurant.entity").Restaurant>;
    update(id: string, updateRestaurantDto: UpdateRestaurantDto): Promise<import("./restaurant.entity").Restaurant>;
    softDelete(id: string): Promise<void>;
}
