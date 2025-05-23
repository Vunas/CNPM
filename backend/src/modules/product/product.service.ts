import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryReposity: Repository<Category>,
  ) {}

  async findAllImagePaths(): Promise<string[]> {
    const products = await this.productRepository.find({
      select: ['imageUrl'],
    });

    return products
      .map((product) => product.imageUrl)
      .filter((url): url is string => url !== null);
  }

  async isValidate(categoryId: string): Promise<{ category: Category }> {
    const category = await this.categoryReposity.findOneBy({
      categoryId: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return { category };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId } = createProductDto;
    const { category } = await this.isValidate(categoryId ?? '');
    const product = this.productRepository.create({
      ...createProductDto,
      category,
    });
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category'],
      where: { status: Not(0) },
    });
  }

  async findAllActive(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category'],
      where: { status: 1 },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ productId: id });
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
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const { categoryId } = updateProductDto;
    await this.isValidate(categoryId ?? '');

    await this.productRepository.save(updateProductDto);

    return this.findOne(id);
  }

  async lock(id: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if (product.status === 2) {
      await this.productRepository.update(id, { status: 1 });
      return;
    }
    await this.productRepository.update(id, { status: 2 });
  }

  async softDelete(id: string): Promise<void> {
    await this.productRepository.update(id, { status: 0 });
  }
}
