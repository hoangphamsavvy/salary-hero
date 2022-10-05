import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({})
  address: string;
}
