import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../category/category.entity';
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryReposity;
    constructor(productRepository: Repository<Product>, categoryReposity: Repository<Category>);
    findAllImagePaths(): Promise<string[]>;
    isValidate(categoryId: string): Promise<{
        category: Category;
    }>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findAllActive(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    findByCategory(categoryId: string): Promise<Product[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    lock(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
}
