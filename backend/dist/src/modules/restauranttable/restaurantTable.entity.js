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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantTable = void 0;
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
let RestaurantTable = class RestaurantTable {
    tableId;
    tableNumber;
    qrCode;
    restaurantId;
    restaurant;
    status;
};
exports.RestaurantTable = RestaurantTable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RestaurantTable.prototype, "tableId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], RestaurantTable.prototype, "tableNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], RestaurantTable.prototype, "qrCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], RestaurantTable.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'restaurantId', referencedColumnName: 'restaurantId' }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], RestaurantTable.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], RestaurantTable.prototype, "status", void 0);
exports.RestaurantTable = RestaurantTable = __decorate([
    (0, typeorm_1.Entity)('RestaurantTable')
], RestaurantTable);
//# sourceMappingURL=restaurantTable.entity.js.map