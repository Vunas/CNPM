import { Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAllImagePaths(): Promise<string[]> {
    const products = await this.categoryRepository.find({
      select: ['imageUrl'],
    });

    return products
      .map((product) => product.imageUrl)
      .filter((url): url is string => url !== null);
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ where: { status: Not(0) } });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      categoryId: id,
    });
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.categoryRepository.update(id, { status: 0 });
  }
}
