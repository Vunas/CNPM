import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { CategoryService } from 'src/modules/category/category.service';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class FileCleanupService implements OnModuleInit {
  constructor(
    private readonly ProductService: ProductService,
    private readonly CategoryService: CategoryService,
  ) {}

  @Cron('0 0 * * *')
  async cleanUnusedFiles() {
    await this.executeCleanup();
  }

  async onModuleInit() {
    await this.executeCleanup();
  }

  private async executeCleanup() {
    const uploadDir = path.join(__dirname, '..', '..', 'uploads');
    const files = fs.readdirSync(uploadDir);

    if (files.length > 0) {
      const usedFiles = new Set([
        ...(await this.ProductService.findAllImagePaths()),
        ...(await this.CategoryService.findAllImagePaths()),
      ]);

      for (const file of files) {
        const filePath = path.join(uploadDir, file);

        if (!Array.from(usedFiles).some((item) => item.includes(file))) {
          try {
            fs.unlinkSync(filePath); //
            console.log(`🗑️ Delete file not used: ${file}`);
          } catch (error) {
            console.error(`❌ Cannot delete file: ${file}, error: ${error}`);
          }
        }
      }
    }
  }
}
