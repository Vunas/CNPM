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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const product_entity_1 = require("./product.entity");
const category_entity_1 = require("../category/category.entity");
let ProductService = class ProductService {
    productRepository;
    categoryReposity;
    constructor(productRepository, categoryReposity) {
        this.productRepository = productRepository;
        this.categoryReposity = categoryReposity;
    }
    async findAllImagePaths() {
        const products = await this.productRepository.find({
            select: ['imageUrl'],
        });
        return products
            .map((product) => product.imageUrl)
            .filter((url) => url !== null);
    }
    async isValidate(categoryId) {
        const category = await this.categoryReposity.findOneBy({
            categoryId: categoryId,
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID ${categoryId} not found`);
        }
        return { category };
    }
    async create(createProductDto) {
        const { categoryId } = createProductDto;
        const { category } = await this.isValidate(categoryId ?? '');
        const product = this.productRepository.create({
            ...createProductDto,
            category,
        });
        return await this.productRepository.save(product);
    }
    async findAll() {
        return await this.productRepository.find({
            relations: ['category'],
            where: { status: (0, typeorm_1.Not)(0) },
        });
    }
    async findAllActive() {
        return await this.productRepository.find({
            relations: ['category'],
            where: { status: 1 },
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOneBy({ productId: id });
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        return product;
    }
    async findByCategory(categoryId) {
        return await this.productRepository.find({
            where: { category: { categoryId } },
        });
    }
    async update(id, updateProductDto) {
        const product = await this.productRepository.findOneBy({ productId: id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        const { categoryId } = updateProductDto;
        await this.isValidate(categoryId ?? '');
        await this.productRepository.save(updateProductDto);
        return this.findOne(id);
    }
    async lock(id) {
        const product = await this.productRepository.findOneBy({ productId: id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        if (product.status === 2) {
            await this.productRepository.update(id, { status: 1 });
            return;
        }
        await this.productRepository.update(id, { status: 2 });
    }
    async softDelete(id) {
        await this.productRepository.update(id, { status: 0 });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map