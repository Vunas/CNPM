import { RestaurantTableService } from './restaurantTable.service';
import { CreateRestaurantTableDto } from './dto/create-restaurantTable.dto';
import { UpdateRestaurantTableDto } from './dto/update-restaurantTable.dto';
export declare class RestaurantTableController {
    private readonly restaurantTableService;
    constructor(restaurantTableService: RestaurantTableService);
    create(createRestaurantTableDto: CreateRestaurantTableDto): Promise<import("./restaurantTable.entity").RestaurantTable>;
    findAll(): Promise<import("./restaurantTable.entity").RestaurantTable[]>;
    findOne(id: string): Promise<import("./restaurantTable.entity").RestaurantTable>;
    update(id: string, updateRestaurantTableDto: UpdateRestaurantTableDto): Promise<import("./restaurantTable.entity").RestaurantTable>;
    updateStatus(id: string, newStatus: {
        status: number;
    }): Promise<import("./restaurantTable.entity").RestaurantTable>;
    softDelete(id: string): Promise<void>;
}
