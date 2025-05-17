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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../modules/account/account.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const account_service_1 = require("../modules/account/account.service");
const axios_1 = require("axios");
let AuthService = class AuthService {
    jwtService;
    accountService;
    accountRepository;
    constructor(jwtService, accountService, accountRepository) {
        this.jwtService = jwtService;
        this.accountService = accountService;
        this.accountRepository = accountRepository;
    }
    async login(loginDto) {
        const account = await this.accountRepository.findOne({
            where: { username: loginDto.username, status: 1 },
            relations: ['restaurant'],
        });
        if (!account) {
            throw new common_1.UnauthorizedException({
                message: 'Invalid username or password',
                hint: 'Ensure the username is correct and active',
            });
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, account.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException({
                message: 'Invalid username or password',
                hint: 'Check your password carefully',
            });
        }
        const payload = {
            username: account.username,
            sub: account.accountId,
            role: account.role,
            restaurantID: account.restaurant?.restaurantId,
        };
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
                expiresIn: process.env.JWT_EXPIRES_IN || '1h',
            }),
        };
    }
    async loginWithGoogle(idToken) {
        if (!idToken || typeof idToken !== 'string') {
            throw new Error('Google idToken is missing or invalid!');
        }
        const googleApiUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
        try {
            const response = await axios_1.default.get(googleApiUrl);
            const data = response.data;
            if (!data) {
                throw new Error('Not found data');
            }
            if (data.aud !== process.env.GOOGLE_CLIENT_ID) {
                throw new common_1.UnauthorizedException('Invalid token audience');
            }
            if (!data.email_verified) {
                throw new common_1.UnauthorizedException('Email not verified by Google');
            }
            const account = await this.accountRepository.findOne({
                where: { email: data.email, status: 1 },
                relations: ['restaurant'],
            });
            if (!account) {
                throw new common_1.UnauthorizedException('Account not found');
            }
            const payload = {
                username: account.username,
                sub: account.accountId,
                role: account.role,
                restaurantID: account.restaurant?.restaurantId,
            };
            return {
                accessToken: await this.jwtService.signAsync(payload, {
                    secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
                    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
                }),
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException('Invalid Google token');
        }
    }
    async refreshToken(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
            });
            const newAccessToken = await this.jwtService.signAsync({ username: payload.username, sub: payload.sub, role: payload.role }, {
                secret: process.env.JWT_SECRET || 'UltraSecureKey_2025!@#xyz123',
                expiresIn: '1h',
            });
            return { accessToken: newAccessToken };
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException({
                message: 'Invalid or expired refresh token',
            });
        }
    }
    async getAccountByUsername(username) {
        const account = await this.accountService.findOneByUsername(username);
        if (!account) {
            throw new common_1.UnauthorizedException({
                message: 'Account not found',
                hint: 'Make sure the account ID is correct',
            });
        }
        return {
            account: account,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        account_service_1.AccountService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map