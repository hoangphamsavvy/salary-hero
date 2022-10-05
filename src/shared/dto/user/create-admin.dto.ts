import { RoleEnum } from '@common/constants/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({})
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  companyId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty({})
  salary: number;

  @IsNotEmpty()
  @IsEnum(RoleEnum)
  @ApiProperty({})
  role: RoleEnum;
}
