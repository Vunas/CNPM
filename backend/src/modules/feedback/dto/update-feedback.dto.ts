import { IsOptional, IsString, IsEmail } from 'class-validator';

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
}
