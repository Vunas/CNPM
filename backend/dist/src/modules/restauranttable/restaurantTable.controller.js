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
exports.RestaurantTableController = void 0;
const common_1 = require("@nestjs/common");
const restaurantTable_service_1 = require("./restaurantTable.service");
const create_restaurantTable_dto_1 = require("./dto/create-restaurantTable.dto");
const update_restaurantTable_dto_1 = require("./dto/update-restaurantTable.dto");
let RestaurantTableController = class RestaurantTableController {
    restaurantTableService;
    constructor(restaurantTableService) {
        this.restaurantTableService = restaurantTableService;
    }
    create(createRestaurantTableDto) {
        return this.restaurantTableService.create(createRestaurantTableDto);
    }
    findAll() {
        return this.restaurantTableService.findAll();
    }
    findOne(id) {
        return this.restaurantTableService.findOne(id);
    }
    update(id, updateRestaurantTableDto) {
        return this.restaurantTableService.update(id, updateRestaurantTableDto);
    }
    updateStatus(id, newStatus) {
        return this.restaurantTableService.updateStatus(id, newStatus.status);
    }
    softDelete(id) {
        return this.restaurantTableService.softDelete(id);
    }
};
exports.RestaurantTableController = RestaurantTableController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurantTable_dto_1.CreateRestaurantTableDto]),
    __metadata("design:returntype", void 0)
], RestaurantTableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RestaurantTableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantTableController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_restaurantTable_dto_1.UpdateRestaurantTableDto]),
    __metadata("design:returntype", void 0)
], RestaurantTableController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], RestaurantTableController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RestaurantTableController.prototype, "softDelete", null);
exports.RestaurantTableController = RestaurantTableController = __decorate([
    (0, common_1.Controller)('restaurant-table'),
    __metadata("design:paramtypes", [restaurantTable_service_1.RestaurantTableService])
], RestaurantTableController);
//# sourceMappingURL=restaurantTable.controller.js.map