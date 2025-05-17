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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const account_entity_1 = require("../account/account.entity");
const restaurantTable_entity_1 = require("../restauranttable/restaurantTable.entity");
let Order = class Order {
    orderId;
    orderDate;
    totalPrice;
    orderStatus;
    orderType;
    paymentMethod;
    tableId;
    restaurantTable;
    customerContact;
    accountId;
    account;
    restaurant;
    status;
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Pending', 'Confirmed', 'Prepared', 'Finished', 'Cancelled'],
        default: 'Pending',
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Dine-in', 'Takeaway', 'Delivery'],
        default: 'Takeaway',
    }),
    __metadata("design:type", String)
], Order.prototype, "orderType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Cash', 'Credit Card', 'E-wallet'],
        nullable: true,
    }),
    __metadata("design:type", Object)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "tableId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurantTable_entity_1.RestaurantTable, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'tableId', referencedColumnName: 'tableId' }),
    __metadata("design:type", Object)
], Order.prototype, "restaurantTable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "customerContact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Order.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_entity_1.Account, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'accountId', referencedColumnName: 'accountId' }),
    __metadata("design:type", Object)
], Order.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => restaurant_entity_1.Restaurant, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'restaurantId', referencedColumnName: 'restaurantId' }),
    __metadata("design:type", restaurant_entity_1.Restaurant)
], Order.prototype, "restaurant", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)('Order')
], Order);
//# sourceMappingURL=order.entity.js.map