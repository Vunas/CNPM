import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Restaurant } from '../restaurant/restaurant.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
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

  async isValidate(
    categoryId: string,
    restaurantId: string,
  ): Promise<{ category: Category; restaurant: Restaurant }> {
    const restaurant = await this.restaurantRepository.findOneBy({
      restaurantId: restaurantId,
    });
    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID ${restaurantId} not found`,
      );
    }
    const category = await this.categoryReposity.findOneBy({
      categoryId: categoryId,
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return { category, restaurant };
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, restaurantId } = createProductDto;
    const { category, restaurant } = await this.isValidate(
      categoryId ?? '',
      restaurantId ?? '',
    );
    const product = this.productRepository.create({
      ...createProductDto,
      category,
      restaurant,
    });
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category', 'restaurant'],
    });
  }

  async findAllActive(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['category', 'restaurant'],
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
    const { categoryId, restaurantId } = updateProductDto;
    await this.isValidate(categoryId ?? '', restaurantId ?? '');

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
