import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(dto: CreateFeedbackDto): Promise<import("./feedback.entity").Feedback>;
    findAll(): Promise<import("./feedback.entity").Feedback[]>;
    findOne(id: string): Promise<import("./feedback.entity").Feedback | null>;
    update(id: string, dto: UpdateFeedbackDto): Promise<import("./feedback.entity").Feedback>;
    softDelete(id: string): Promise<void>;
}
