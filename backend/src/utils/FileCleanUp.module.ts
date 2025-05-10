import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FileCleanupService } from './FileCleanUp.service';
import { ProductModule } from 'src/modules/product/product.module';
import { CategoryModule } from 'src/modules/category/category.module';

@Module({
  imports: [ScheduleModule.forRoot(), ProductModule, CategoryModule],
  providers: [FileCleanupService],
  exports: [FileCleanupService],
})
export class FileCleanupModule {}
