import { RoleEnum } from '@common/constants/role.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({})
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiPropertyOptional({})
  salary: number;

  @IsOptional()
  @IsEnum(RoleEnum)
  @ApiPropertyOptional({})
  role: RoleEnum;
}
