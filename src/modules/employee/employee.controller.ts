import { Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  Param,
  UploadedFile,
} from '@nestjs/common/decorators/http/route-params.decorator';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateEmployeeDto,
  FilterEmployeeDto,
  UpdateEmployeeDto,
} from '@shared/dto/employee';
import { EmployeeService } from '@employee/employee.service';
import { RoleEnum } from '@common/constants/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiResponse({})
  async createEmployee(
    @Query('companyAdminId') companyAdminId: string,
    @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto,
  ) {
    await this.employeeService.getAdmin(companyAdminId, RoleEnum.COMPANY_ADMIN);
    const employee = await this.employeeService.createEmployee(
      createEmployeeDto,
    );
    return employee;
  }

  @Get()
  @ApiResponse({})
  async getAll(
    @Query('companyAdminId') companyAdminId: string,
    @Query() filterEmployeeDto: FilterEmployeeDto,
  ) {
    await this.employeeService.getAdmin(companyAdminId, RoleEnum.COMPANY_ADMIN);
    const { items, pagination } = await this.employeeService.getAll(
      filterEmployeeDto,
    );
    return { data: items, pagination };
  }

  @Get('/:id')
  @ApiResponse({})
  async getById(
    @Query('companyAdminId') companyAdminId: string,
    @Param('id') id: string,
  ) {
    await this.employeeService.getAdmin(companyAdminId, RoleEnum.COMPANY_ADMIN);
    return await this.employeeService.getById(id);
  }

  @Patch('/:id')
  @ApiResponse({})
  async updateById(
    @Query('companyAdminId') companyAdminId: string,
    @Param('id') id: string,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto,
  ) {
    await this.employeeService.getAdmin(companyAdminId, RoleEnum.COMPANY_ADMIN);
    return await this.employeeService.updateById(id, updateEmployeeDto);
  }

  @Delete('/:id')
  @ApiResponse({})
  async deleteById(
    @Query('companyAdminId') companyAdminId: string,
    @Param('id') id: string,
  ) {
    await this.employeeService.getAdmin(companyAdminId, RoleEnum.COMPANY_ADMIN);
    return await this.employeeService.deleteById(id);
  }

  @Post('/import-employee')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Import employee by excel' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 200,
    description: 'Import employee successfully.',
  })
  async importEmployeeByExcel(
    @Query('companyAdminId') companyAdminId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.employeeService.getAdmin(companyAdminId, RoleEnum.COMPANY_ADMIN);
    return await this.employeeService.importEmployeeByExcel(file);
  }
}
