import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleEnum } from 'src/common/constants/role.enum';
import {
  CompanyRepository,
  UserRepository,
  EmployeeRepository,
} from '@database/repository';
import { CreateAdminDto } from '@shared/dto/user';
import { User } from '@database/entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { email, companyId } = createAdminDto;
    const employee = await this.employeeRepository.findOne({
      where: [{ email, companyId }],
    });
    if (!employee) {
      throw new NotFoundException('Employee is not found!!!');
    }
    const id = employee.id;

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException('Company is not found!!!');
    }
    await this.employeeRepository.update(
      { id },
      {
        ...createAdminDto,
        role: RoleEnum.COMPANY_ADMIN,
      },
    );
  }

  async getSuperAdmin(userId: string, role: RoleEnum) {
    const checkRole = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!checkRole || checkRole?.role !== role)
      throw new ForbiddenException('You have no permission!!!');
    return checkRole;
  }
}
