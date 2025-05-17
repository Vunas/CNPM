export declare class UploadService {
    private readonly uploadDir;
    constructor();
    saveFile(file: Express.Multer.File): string;
    getFile(fileName: string): Buffer;
}
