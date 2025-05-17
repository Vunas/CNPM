import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto): Promise<import("./product.entity").Product>;
    findAll(): Promise<import("./product.entity").Product[]>;
    findAllActive(): Promise<import("./product.entity").Product[]>;
    findOne(id: string): Promise<import("./product.entity").Product>;
    findByCategory(categoryID: string): Promise<import("./product.entity").Product[]>;
    Lock(id: string): Promise<void>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./product.entity").Product>;
    softDelete(id: string): Promise<void>;
}
