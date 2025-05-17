import { UploadService } from './upload.service';
import { Response } from 'express';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): string;
    getFile(fileName: string, res: Response): void;
}
