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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const orderDetail_entity_1 = require("../orderdetail/orderDetail.entity");
const restaurant_entity_1 = require("../restaurant/restaurant.entity");
const restaurantTable_entity_1 = require("../restauranttable/restaurantTable.entity");
const product_entity_1 = require("../product/product.entity");
let OrderService = class OrderService {
    orderRepository;
    orderDetailRepository;
    restaurantRepository;
    restaurantTableRepository;
    productRepository;
    constructor(orderRepository, orderDetailRepository, restaurantRepository, restaurantTableRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.restaurantRepository = restaurantRepository;
        this.restaurantTableRepository = restaurantTableRepository;
        this.productRepository = productRepository;
    }
    async create(createOrderDto) {
        return await this.orderRepository.save(this.orderRepository.create(createOrderDto));
    }
    async getLatestOrderByTable(tableId) {
        return await this.orderRepository.findOne({
            where: { tableId },
            order: { orderDate: 'DESC' },
        });
    }
    async createOrderWithDetails(currentOrder, createOrderDto, createOrderDetailDtos) {
        const restaurant = await this.findRestaurant(createOrderDto.restaurantId);
        const restaurantTable = await this.findRestaurantTable(createOrderDto?.tableId || '');
        await this.validateTableStatus(restaurantTable, createOrderDto?.tableId || '', currentOrder);
        const order = await this.orderRepository.save(this.orderRepository.create({
            ...createOrderDto,
            restaurant,
            restaurantTable,
        }));
        await this.createOrderDetails(order, createOrderDetailDtos);
        return order;
    }
    async findAll() {
        return await this.orderRepository.find({
            relations: ['restaurantTable', 'restaurant', 'account'],
            where: { status: (0, typeorm_2.Not)(0) },
        });
    }
    async findOne(id) {
        return this.findOrder(id);
    }
    async update(id, updateOrderDto) {
        await this.findOrder(id);
        await this.orderRepository.update(id, updateOrderDto);
        return await this.findOrder(id);
    }
    async softDelete(id) {
        await this.findOrder(id);
        await this.orderRepository.update(id, { status: 0 });
    }
    async findRestaurant(restaurantId) {
        const restaurant = await this.restaurantRepository.findOneBy({
            restaurantId,
        });
        if (!restaurant)
            throw new common_1.NotFoundException(`Restaurant with ID ${restaurantId} not found`);
        return restaurant;
    }
    async findRestaurantTable(tableId) {
        const table = await this.restaurantTableRepository.findOneBy({ tableId });
        if (!table)
            throw new common_1.NotFoundException(`RestaurantTable with ID ${tableId} not found`);
        return table;
    }
    async validateTableStatus(table, tableId, currentOrder) {
        if ([2, 4].includes(table.status)) {
            throw new common_1.BadRequestException(`Table ID ${tableId} is locked, please contact staff.`);
        }
        if (table.status == 3)
            await this.validateOrder(currentOrder, tableId);
    }
    async validateOrder(currentOrder, tableId) {
        if (!currentOrder) {
            throw new common_1.BadRequestException(`Table ID ${tableId} is currently in use, please contact staff.`);
        }
        if (currentOrder.orderId !==
            (await this.getLatestOrderByTable(tableId))?.orderId) {
            throw new common_1.BadRequestException(`Table ID ${tableId} is currently in use, please contact staff.`);
        }
    }
    async createOrderDetails(order, detailsDtos) {
        const orderDetails = await Promise.all(detailsDtos.map(async (dto) => {
            const product = await this.productRepository.findOneBy({
                productId: dto.productId,
            });
            if (!product)
                throw new common_1.NotFoundException(`Product with ID ${dto.productId} not found`);
            return this.orderDetailRepository.create({ ...dto, order, product });
        }));
        await this.orderDetailRepository.save(orderDetails);
    }
    async findOrder(id) {
        const order = await this.orderRepository.findOne({
            where: { orderId: id },
            relations: ['restaurantTable', 'restaurant', 'account'],
        });
        if (!order)
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(orderDetail_entity_1.OrderDetail)),
    __param(2, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(3, (0, typeorm_1.InjectRepository)(restaurantTable_entity_1.RestaurantTable)),
    __param(4, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map