import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from '@shared/dto/request';
import { RequestService } from './request.service';

@ApiTags('Requests')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiResponse({})
  async createEmployee(
    @Body(ValidationPipe) createRequestDto: CreateRequestDto,
  ) {
    return await this.requestService.createRequest(createRequestDto);
  }
}
