import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({})
  employeeId: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({})
  amount: number;
}
