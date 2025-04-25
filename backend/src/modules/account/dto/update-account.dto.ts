import { IsOptional, IsString, IsEmail, IsEnum, Length } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @Length(4, 50)
  username?: string;

  @IsOptional()
  @IsString()
  passwordHash?: string;

  @IsOptional()
  @IsEnum(['Admin', 'Employee', 'Kitchen'])
  role?: 'Admin' | 'Employee' | 'Kitchen';

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(10, 15)
  phone?: string;

  @IsOptional()
  @IsString()
  restaurantId?: string;

  @IsOptional()
  status?: number;
}
