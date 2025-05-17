"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./order.entity");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const orderDetail_entity_1 = require("../orderdetail/orderDetail.entity");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const restaurantTable_entity_1 = require("../restauranttable/restaurantTable.entity");
const product_entity_1 = require("../product/product.entity");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order]),
            typeorm_1.TypeOrmModule.forFeature([orderDetail_entity_1.OrderDetail]),
            typeorm_1.TypeOrmModule.forFeature([restaurant_entity_1.Restaurant]),
            typeorm_1.TypeOrmModule.forFeature([restaurantTable_entity_1.RestaurantTable]),
            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),
        ],
        providers: [order_service_1.OrderService],
        controllers: [order_controller_1.OrderController],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map