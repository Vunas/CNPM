import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  status: number;
}
