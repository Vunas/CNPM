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
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const account_service_1 = require("../modules/account/account.service");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../modules/account/account.entity");
const restaurant_entity_1 = require("../modules/restaurant/restaurant.entity");
let AuthModule = class AuthModule {
    constructor() {
        console.log('✅ AuthModule initialized!');
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
            }),
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account, restaurant_entity_1.Restaurant]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, account_service_1.AccountService],
    }),
    __metadata("design:paramtypes", [])
], AuthModule);
//# sourceMappingURL=auth.module.js.map