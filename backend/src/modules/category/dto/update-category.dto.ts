import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  status?: number;
}
