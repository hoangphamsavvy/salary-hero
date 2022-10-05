import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageLimitDto } from 'src/common/dto/page-limit.dto';

export class FilterEmployeeDto extends PageLimitDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({})
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({})
  email: string;
}
