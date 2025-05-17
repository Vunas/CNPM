import { Category } from '../category/category.entity';
export declare class Product {
    productId: string;
    name: string;
    description: string | null;
    price: number;
    category: Category | null;
    imageUrl: string | null;
    status: number;
}
