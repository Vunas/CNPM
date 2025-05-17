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
exports.OrderDetailService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orderDetail_entity_1 = require("./orderDetail.entity");
let OrderDetailService = class OrderDetailService {
    orderDetailRepository;
    constructor(orderDetailRepository) {
        this.orderDetailRepository = orderDetailRepository;
    }
    async create(createOrderDetailDto) {
        const orderDetail = this.orderDetailRepository.create(createOrderDetailDto);
        return await this.orderDetailRepository.save(orderDetail);
    }
    async findAll() {
        return await this.orderDetailRepository.find({
            relations: ['order', 'product'],
            where: { status: (0, typeorm_2.Not)(0) },
        });
    }
    async findOne(id) {
        const orderDetail = await this.orderDetailRepository.findOne({
            where: { orderDetailId: id },
            relations: ['order', 'product'],
        });
        if (!orderDetail) {
            throw new Error(`OrderDetail with ID ${id} not found`);
        }
        return orderDetail;
    }
    async update(id, updateOrderDetailDto) {
        await this.orderDetailRepository.update(id, updateOrderDetailDto);
        return this.findOne(id);
    }
    async softDelete(id) {
        await this.orderDetailRepository.update(id, { status: 0 });
    }
    async findByOrderId(orderId) {
        return this.orderDetailRepository
            .createQueryBuilder('detail')
            .leftJoin('detail.product', 'product')
            .select([
            'detail.orderDetailId AS "orderDetailId"',
            'detail.quantity AS "quantity"',
            'detail.price AS "price"',
            'product.name AS "productName"',
            'product.price AS "productPrice"',
        ])
            .where('detail.orderId = :orderId', { orderId })
            .getRawMany();
    }
};
exports.OrderDetailService = OrderDetailService;
exports.OrderDetailService = OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orderDetail_entity_1.OrderDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderDetailService);
//# sourceMappingURL=orderDetail.service.js.map