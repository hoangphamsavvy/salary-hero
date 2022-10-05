import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '@shared/dto/user';
import { UserService } from '@user/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/admin')
  @ApiResponse({})
  async createAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    return await this.userService.createAdmin(createAdminDto);
  }
}
