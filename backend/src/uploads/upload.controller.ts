import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.saveFile(file);
  }

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const fileBuffer = this.uploadService.getFile(fileName);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(fileBuffer);
  }
}
