import { OnModuleInit } from '@nestjs/common';
import { CategoryService } from 'src/modules/category/category.service';
import { ProductService } from 'src/modules/product/product.service';
export declare class FileCleanupService implements OnModuleInit {
    private readonly ProductService;
    private readonly CategoryService;
    constructor(ProductService: ProductService, CategoryService: CategoryService);
    cleanUnusedFiles(): Promise<void>;
    onModuleInit(): Promise<void>;
    private executeCleanup;
}
