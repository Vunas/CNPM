"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCleanupModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const FileCleanUp_service_1 = require("./FileCleanUp.service");
const product_module_1 = require("../modules/product/product.module");
const category_module_1 = require("../modules/category/category.module");
let FileCleanupModule = class FileCleanupModule {
};
exports.FileCleanupModule = FileCleanupModule;
exports.FileCleanupModule = FileCleanupModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), product_module_1.ProductModule, category_module_1.CategoryModule],
        providers: [FileCleanUp_service_1.FileCleanupService],
        exports: [FileCleanUp_service_1.FileCleanupService],
    })
], FileCleanupModule);
//# sourceMappingURL=FileCleanUp.module.js.map