import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  FilterCompanyDto,
} from '@shared/dto/company';
import { CompanyService } from '@company/company.service';
import { UserService } from '@user/user.service';
import { RoleEnum } from '@common/constants/role.enum';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiResponse({})
  async create(
    @Query('superAdminId') superAdminId: string,
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
  ) {
    await this.userService.getSuperAdmin(superAdminId, RoleEnum.SUPER_ADMIN);
    const company = await this.companyService.create(createCompanyDto);
    return { data: company };
  }

  @Get()
  @ApiResponse({})
  async getAll(
    @Query('superAdminId') superAdminId: string,
    @Query('filterCompany') filterCompanyDto: FilterCompanyDto,
  ) {
    await this.userService.getSuperAdmin(superAdminId, RoleEnum.SUPER_ADMIN);
    const { items, pagination } = await this.companyService.getAll(
      filterCompanyDto,
    );
    return { data: items, pagination };
  }

  @Get('/:id')
  @ApiResponse({})
  async getById(
    @Query('superAdminId') superAdminId: string,
    @Param('id') id: string,
  ) {
    await this.userService.getSuperAdmin(superAdminId, RoleEnum.SUPER_ADMIN);
    return await this.companyService.getById(id);
  }

  @Patch('/:id')
  @ApiResponse({})
  async updateById(
    @Query('superAdminId') superAdminId: string,
    @Param('id') id: string,
    @Body(ValidationPipe) updateCompanyDto: UpdateCompanyDto,
  ) {
    await this.userService.getSuperAdmin(superAdminId, RoleEnum.SUPER_ADMIN);
    return await this.companyService.updateById(id, updateCompanyDto);
  }

  @Delete('/:id')
  @ApiResponse({})
  async deleteById(
    @Query('superAdminId') superAdminId: string,
    @Param('id') id: string,
  ) {
    await this.userService.getSuperAdmin(superAdminId, RoleEnum.SUPER_ADMIN);
    return await this.companyService.deleteById(id);
  }
}
