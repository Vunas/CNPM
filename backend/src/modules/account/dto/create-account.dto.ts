import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  username: string;

  @IsNotEmpty()
  @IsString()
  passwordHash: string;

  @IsNotEmpty()
  @IsEnum(['Admin', 'Employee', 'Kitchen'])
  role: 'Admin' | 'Employee' | 'Kitchen';

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
}
