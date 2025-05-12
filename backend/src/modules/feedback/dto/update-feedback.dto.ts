import {
  IsOptional,
  IsString,
  IsEmail,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class UpdateFeedbackDto {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
