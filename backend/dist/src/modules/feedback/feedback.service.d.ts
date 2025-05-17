import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
export declare class FeedbackService {
    private readonly feedbackRepo;
    constructor(feedbackRepo: Repository<Feedback>);
    create(dto: CreateFeedbackDto): Promise<Feedback>;
    findAll(): Promise<Feedback[]>;
    findOne(id: string): Promise<Feedback | null>;
    update(id: string, dto: UpdateFeedbackDto): Promise<Feedback>;
    softDelete(id: string): Promise<void>;
}
