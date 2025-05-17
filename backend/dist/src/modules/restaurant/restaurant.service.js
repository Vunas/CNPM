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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
let RestaurantService = class RestaurantService {
    restaurantRepository;
    constructor(restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }
    async findAll() {
        return await this.restaurantRepository.find({ where: { status: (0, typeorm_1.Not)(0) } });
    }
    async findOne(id) {
        const restaurant = await this.restaurantRepository.findOneBy({
            restaurantId: id,
        });
        if (!restaurant) {
            throw new Error(`Restaurant with ID ${id} not found`);
        }
        return restaurant;
    }
    async create(createRestaurantDto) {
        const restaurant = this.restaurantRepository.create(createRestaurantDto);
        return await this.restaurantRepository.save(restaurant);
    }
    async update(id, updateRestaurantDto) {
        await this.restaurantRepository.update(id, updateRestaurantDto);
        return this.findOne(id);
    }
    async softDelete(id) {
        await this.restaurantRepository.update(id, { status: 0 });
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(restaurant_entity_1.Restaurant)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map