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

    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException('Company is not found!!!');
    }

    if (employee) {
      const id = employee.id;
      await this.employeeRepository.update(
        { id },
        {
          ...createAdminDto,
          role: RoleEnum.COMPANY_ADMIN,
        },
      );
    } else {
      const employee = this.employeeRepository.create({
        ...createAdminDto,
        role: RoleEnum.COMPANY_ADMIN,
      });
      await employee.save();
    }
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
