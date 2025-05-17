"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VnPayModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_vnpay_1 = require("nestjs-vnpay");
const vnpay_1 = require("vnpay");
const vnpay_2 = require("vnpay");
const vnpay_controller_1 = require("./vnpay.controller");
const vnpay_service_1 = require("./vnpay.service");
let VnPayModule = class VnPayModule {
};
exports.VnPayModule = VnPayModule;
exports.VnPayModule = VnPayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_vnpay_1.VnpayModule.register({
                tmnCode: 'YOUR_TMN_CODE',
                secureSecret: 'YOUR_SECURE_SECRET',
                vnpayHost: 'https://sandbox.vnpayment.vn',
                testMode: true,
                hashAlgorithm: vnpay_2.HashAlgorithm.SHA512,
                enableLog: true,
                loggerFn: vnpay_1.ignoreLogger,
            }),
        ],
        controllers: [vnpay_controller_1.VnPayController],
        providers: [vnpay_service_1.VnPayService],
    })
], VnPayModule);
//# sourceMappingURL=vnpay.module.js.map