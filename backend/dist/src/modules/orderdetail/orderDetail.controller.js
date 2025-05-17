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
exports.OrderDetailController = void 0;
const common_1 = require("@nestjs/common");
const orderDetail_service_1 = require("./orderDetail.service");
const create_orderDetail_dto_1 = require("./dto/create-orderDetail.dto");
const update_orderDetail_dto_1 = require("./dto/update-orderDetail.dto");
let OrderDetailController = class OrderDetailController {
    orderDetailService;
    constructor(orderDetailService) {
        this.orderDetailService = orderDetailService;
    }
    create(createOrderDetailDto) {
        return this.orderDetailService.create(createOrderDetailDto);
    }
    findAll() {
        return this.orderDetailService.findAll();
    }
    findOne(id) {
        return this.orderDetailService.findOne(id);
    }
    findByOrderId(orderId) {
        return this.orderDetailService.findByOrderId(orderId);
    }
    update(id, updateOrderDetailDto) {
        return this.orderDetailService.update(id, updateOrderDetailDto);
    }
    softDelete(id) {
        return this.orderDetailService.softDelete(id);
    }
};
exports.OrderDetailController = OrderDetailController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_orderDetail_dto_1.CreateOrderDetailDto]),
    __metadata("design:returntype", void 0)
], OrderDetailController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderDetailController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderDetailController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('order/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderDetailController.prototype, "findByOrderId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_orderDetail_dto_1.UpdateOrderDetailDto]),
    __metadata("design:returntype", void 0)
], OrderDetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderDetailController.prototype, "softDelete", null);
exports.OrderDetailController = OrderDetailController = __decorate([
    (0, common_1.Controller)('order-detail'),
    __metadata("design:paramtypes", [orderDetail_service_1.OrderDetailService])
], OrderDetailController);
//# sourceMappingURL=orderDetail.controller.js.map