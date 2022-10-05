import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({})
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({})
  address: string;
}
