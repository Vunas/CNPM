import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category', 'restaurant'],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ productID: id });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category: { categoryId } },
    });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.productRepository.update(id, { isActive: 0 });
  }
}
