import { RoleEnum } from '@common/constants/role.enum';
import { Body, Controller, Post, Query, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '@shared/dto/user';
import { UserService } from '@user/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/admin')
  @ApiResponse({})
  async createAdmin(
    @Query('superAdminId') superAdminId: string,
    @Body(ValidationPipe) createAdminDto: CreateAdminDto,
  ) {
    await this.userService.getSuperAdmin(superAdminId, RoleEnum.SUPER_ADMIN);
    return await this.userService.createAdmin(createAdminDto);
  }
}
