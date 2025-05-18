import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadDir = path.join(__dirname, '../../uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
      console.log('📁 Đã tạo thư mục uploads:', this.uploadDir);
    }
  }

  saveFile(file: Express.Multer.File): string {
    if (!file || !file.originalname || !file.buffer) {
      throw new BadRequestException('Không có file hợp lệ!');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Chỉ chấp nhận tệp hình ảnh!');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);

    return `${process.env.BASE_URL}/api/uploads/${fileName}`;
  }

  getFile(fileName: string): Buffer {
    try {
      const filePath = path.join(this.uploadDir, fileName);
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('File không tồn tại!');
      }

      return fs.readFileSync(filePath);
    } catch (error) {
      throw new NotFoundException(`Lỗi khi đọc file: ${error.message}`);
    }
  }
}
