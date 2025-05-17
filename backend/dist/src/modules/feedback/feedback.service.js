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
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feedback_entity_1 = require("./feedback.entity");
let FeedbackService = class FeedbackService {
    feedbackRepo;
    constructor(feedbackRepo) {
        this.feedbackRepo = feedbackRepo;
    }
    async create(dto) {
        const feedback = this.feedbackRepo.create({
            ...dto,
            order: { orderId: dto.orderId },
        });
        return this.feedbackRepo.save(feedback);
    }
    async findAll() {
        return this.feedbackRepo.find({ where: { status: (0, typeorm_2.Not)(0) } });
    }
    async findOne(id) {
        return this.feedbackRepo.findOne({ where: { feedbackId: id } });
    }
    async update(id, dto) {
        await this.feedbackRepo.update(id, dto);
        const updated = await this.findOne(id);
        if (!updated) {
            throw new Error(`Feedback với ID ${id} không tồn tại`);
        }
        return updated;
    }
    async softDelete(id) {
        await this.feedbackRepo.update(id, { status: 0 });
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map