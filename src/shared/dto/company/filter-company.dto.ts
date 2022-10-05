import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageLimitDto } from 'src/common/dto/page-limit.dto';

export class FilterCompanyDto extends PageLimitDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  name: string;
}
