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
exports.VnPayService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_vnpay_1 = require("nestjs-vnpay");
const vnpay_1 = require("vnpay");
let VnPayService = class VnPayService {
    vnpayService;
    constructor(vnpayService) {
        this.vnpayService = vnpayService;
    }
    async getBankList() {
        return this.vnpayService.getBankList();
    }
    createPaymentUrl(orderId, amount, created, home) {
        const expire = created;
        expire.setMinutes(expire.getMinutes() + 1);
        return this.vnpayService.buildPaymentUrl({
            vnp_Amount: amount,
            vnp_IpAddr: '13.160.92.202',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: 'Thanh toan don hang',
            vnp_OrderType: vnpay_1.ProductCode.Cuisine,
            vnp_ReturnUrl: home,
            vnp_Locale: vnpay_1.VnpLocale.EN,
            vnp_CreateDate: (0, vnpay_1.dateFormat)(created),
            vnp_ExpireDate: (0, vnpay_1.dateFormat)(expire),
        });
    }
};
exports.VnPayService = VnPayService;
exports.VnPayService = VnPayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_vnpay_1.VnpayService])
], VnPayService);
//# sourceMappingURL=vnpay.service.js.map