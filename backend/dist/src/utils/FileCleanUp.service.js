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
exports.FileCleanupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const fs = require("fs");
const path = require("path");
const category_service_1 = require("../modules/category/category.service");
const product_service_1 = require("../modules/product/product.service");
let FileCleanupService = class FileCleanupService {
    ProductService;
    CategoryService;
    constructor(ProductService, CategoryService) {
        this.ProductService = ProductService;
        this.CategoryService = CategoryService;
    }
    async cleanUnusedFiles() {
        await this.executeCleanup();
    }
    async onModuleInit() {
        await this.executeCleanup();
    }
    async executeCleanup() {
        const uploadDir = path.join(__dirname, '..', '..', 'uploads');
        const files = fs.readdirSync(uploadDir);
        if (files.length > 0) {
            const usedFiles = new Set([
                ...(await this.ProductService.findAllImagePaths()),
                ...(await this.CategoryService.findAllImagePaths()),
            ]);
            for (const file of files) {
                const filePath = path.join(uploadDir, file);
                if (!Array.from(usedFiles).some((item) => item.includes(file))) {
                    try {
                        fs.unlinkSync(filePath);
                        console.log(`🗑️ Delete file not used: ${file}`);
                    }
                    catch (error) {
                        console.error(`❌ Cannot delete file: ${file}, error: ${error}`);
                    }
                }
            }
        }
    }
};
exports.FileCleanupService = FileCleanupService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FileCleanupService.prototype, "cleanUnusedFiles", null);
exports.FileCleanupService = FileCleanupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        category_service_1.CategoryService])
], FileCleanupService);
//# sourceMappingURL=FileCleanUp.service.js.map