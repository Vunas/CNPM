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
exports.VnPayController = void 0;
const common_1 = require("@nestjs/common");
const vnpay_service_1 = require("./vnpay.service");
let VnPayController = class VnPayController {
    vnpayService;
    constructor(vnpayService) {
        this.vnpayService = vnpayService;
    }
    getBank() {
        return this.vnpayService.getBankList();
    }
    createPayment(orderId, amount, created, returnUrl) {
        const createdDate = created ? new Date(created) : new Date();
        try {
            const paymentUrl = this.vnpayService.createPaymentUrl(orderId, parseInt(amount), createdDate, returnUrl);
            return { paymentUrl };
        }
        catch (error) {
            console.error('Error creating payment URL:', error);
            throw new Error('Error creating payment URL');
        }
    }
};
exports.VnPayController = VnPayController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VnPayController.prototype, "getBank", null);
__decorate([
    (0, common_1.Get)('create'),
    __param(0, (0, common_1.Query)('orderId')),
    __param(1, (0, common_1.Query)('amount')),
    __param(2, (0, common_1.Query)('created')),
    __param(3, (0, common_1.Query)('returnUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], VnPayController.prototype, "createPayment", null);
exports.VnPayController = VnPayController = __decorate([
    (0, common_1.Controller)('vnpay'),
    __metadata("design:paramtypes", [vnpay_service_1.VnPayService])
], VnPayController);
//# sourceMappingURL=vnpay.controller.js.map