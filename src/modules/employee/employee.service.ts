import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository, EmployeeRepository } from '@database/repository';
import {
  CreateEmployeeDto,
  FilterEmployeeDto,
  UpdateEmployeeDto,
} from '@shared/dto/employee';
import { RoleEnum } from '@common/constants/role.enum';
import { Employee } from '@database/entity';
import { isEmail, isNumber } from 'class-validator';
import { read, utils } from 'xlsx';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async createEmployee(createEmployeeDto: CreateEmployeeDto) {
    const { email, companyId } = createEmployeeDto;
    const existEmployee = await this.employeeRepository.findOne({
      where: [{ email, companyId }],
    });
    if (existEmployee) {
      throw new BadRequestException('Employee already exists!!!');
    }

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException('Company not found!!!');
    }

    try {
      const employee = this.employeeRepository.create({ ...createEmployeeDto });
      return await employee.save();
    } catch (error) {
      throw new BadGatewayException('Cannot create new employee!!!');
    }
  }

  async getAll(filterEmployeeDto: FilterEmployeeDto) {
    try {
      return await this.employeeRepository.getAll(filterEmployeeDto);
    } catch (error) {
      throw new BadGatewayException('Cannot get employees!!!');
    }
  }

  async getById(id: string) {
    try {
      const existEmployee = await this.employeeRepository.findOne({
        where: { id },
      });
      if (!existEmployee) {
        throw new NotFoundException('Employee not found!!!');
      }
      return existEmployee;
    } catch (error) {
      throw new BadGatewayException('Cannot get the employee!!!');
    }
  }

  async updateById(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const existEmployee = await this.employeeRepository.findOne({
        where: { id },
      });
      if (!existEmployee) {
        throw new NotFoundException('Employee not found!!!');
      }
      await this.employeeRepository.update({ id }, { ...updateEmployeeDto });
    } catch (error) {
      throw new BadGatewayException('Cannot update the employee!!!');
    }
  }

  async deleteById(id: string) {
    try {
      await this.employeeRepository.softDelete({ id });
    } catch (error) {
      throw new BadGatewayException('Cannot delete the employee!!!');
    }
  }

  async getAdmin(id: string, role: RoleEnum) {
    const checkRole = await this.employeeRepository.findOne({
      where: {
        id,
      },
    });

    if (!checkRole || checkRole?.role !== role)
      throw new ForbiddenException('You have no permission!!!');
    return checkRole;
  }

  async importEmployeeByExcel(file: Express.Multer.File) {
    const workbook = read(file.buffer, { cellDates: true });
    const ws = workbook.Sheets.Sheet1;
    const data: any[] = utils.sheet_to_json(ws);
    const headerTemplate = ['email', 'companyId', 'name', 'role', 'salary'];
    const headerArray: any = utils.sheet_to_json(ws, { header: 1 });

    if (JSON.stringify(headerTemplate) !== JSON.stringify(headerArray[0])) {
      throw new BadRequestException('File header is not match!!!');
    }

    data.map(async (item, idx) => {
      if (!isEmail(item.email) || !isNumber(item.salary)) {
        throw new BadRequestException(
          `Email or Salary of row ${idx} is wrong type!!!`,
        );
      }
    });

    await this.employeeRepository.upsert(data, ['email']);
  }
}
