import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepo: Repository<Feedback>,
  ) {}

  async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const feedback = this.feedbackRepo.create({
      ...dto,
      order: { orderId: dto.orderId }, 
    });
    return this.feedbackRepo.save(feedback);
  }

  async findAll(): Promise<Feedback[]> {
    return this.feedbackRepo.find();
  }

  async findOne(id: string): Promise<Feedback | null> {
    return this.feedbackRepo.findOne({ where: { feedbackId: id } });
  }

  async update(id: string, dto: UpdateFeedbackDto): Promise<Feedback> {
    await this.feedbackRepo.update(id, dto);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new Error(`Feedback với ID ${id} không tồn tại`);
    }
    return updated;
  }
  
  async softDelete(id: string): Promise<void> {
    await this.feedbackRepo.update(id, { status: 0 });
  }
}
