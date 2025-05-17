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
exports.RestaurantTableService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const restaurantTable_entity_1 = require("./restaurantTable.entity");
let RestaurantTableService = class RestaurantTableService {
    restaurantTableRepository;
    constructor(restaurantTableRepository) {
        this.restaurantTableRepository = restaurantTableRepository;
    }
    async create(createRestaurantTableDto) {
        const table = this.restaurantTableRepository.create(createRestaurantTableDto);
        return await this.restaurantTableRepository.save(table);
    }
    async findAll() {
        return await this.restaurantTableRepository.find({
            relations: ['restaurant'],
            where: { status: (0, typeorm_1.Not)(0) },
        });
    }
    async findOne(id) {
        const table = await this.restaurantTableRepository.findOneBy({
            tableId: id,
        });
        if (!table) {
            throw new Error(`Table with ID ${id} not found`);
        }
        return table;
    }
    async update(id, updateRestaurantTableDto) {
        await this.restaurantTableRepository.update(id, updateRestaurantTableDto);
        return this.findOne(id);
    }
    async updateStatus(id, newStatus) {
        const restaurantTable = await this.findOne(id);
        if (!restaurantTable) {
            throw new Error(`RestaurantTable with ID ${id} not found`);
        }
        restaurantTable.status = newStatus;
        await this.restaurantTableRepository.save(restaurantTable);
        return this.findOne(id);
    }
    async softDelete(id) {
        await this.restaurantTableRepository.update(id, { status: 0 });
    }
};
exports.RestaurantTableService = RestaurantTableService;
exports.RestaurantTableService = RestaurantTableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(restaurantTable_entity_1.RestaurantTable)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RestaurantTableService);
//# sourceMappingURL=restaurantTable.service.js.map