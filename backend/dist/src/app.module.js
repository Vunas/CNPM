"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_config_service_1 = require("./config/database.config.service");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const restaurant_module_1 = require("./modules/restaurant/restaurant.module");
const account_module_1 = require("./modules/account/account.module");
const category_module_1 = require("./modules/category/category.module");
const product_module_1 = require("./modules/product/product.module");
const restaurantTable_module_1 = require("./modules/restauranttable/restaurantTable.module");
const order_module_1 = require("./modules/order/order.module");
const orderDetail_module_1 = require("./modules/orderdetail/orderDetail.module");
const auth_module_1 = require("./auth/auth.module");
const vnpay_module_1 = require("./modules/vnpay/vnpay.module");
const upload_module_1 = require("./uploads/upload.module");
const FileCleanUp_module_1 = require("./utils/FileCleanUp.module");
const feedback_module_1 = require("./modules/feedback/feedback.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: database_config_service_1.DatabaseConfigService,
            }),
            restaurant_module_1.RestaurantModule,
            account_module_1.AccountModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            restaurantTable_module_1.RestaurantTableModule,
            order_module_1.OrderModule,
            orderDetail_module_1.OrderDetailModule,
            auth_module_1.AuthModule,
            vnpay_module_1.VnPayModule,
            upload_module_1.UploadModule,
            FileCleanUp_module_1.FileCleanupModule,
            feedback_module_1.FeedbackModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, database_config_service_1.DatabaseConfigService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map