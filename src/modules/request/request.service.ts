import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import moment from 'moment';
import { EmployeeRepository, RequestRepository } from '@database/repository';
import { CreateRequestDto } from '@shared/dto/request';

@Injectable()
export class RequestService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly requestRepository: RequestRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createRequest(createRequestDto: CreateRequestDto) {
    const { employeeId, amount } = createRequestDto;
    const current = new Date();

    const existEmployee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });

    if (!existEmployee) {
      throw new NotFoundException('Employee not found!!!');
    }

    if (amount > existEmployee.salary / 2) {
      throw new BadRequestException(
        'The total amount cannot exceed 50% of the salary!!!',
      );
    }

    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
    const totalSummary = await this.requestRepository
      .createQueryBuilder(`requestTotalAmount`)
      .select(`SUM(requestTotalAmount.amount)`, `totalAmount`)
      .where(`employeeId = :employeeId`, { employeeId: existEmployee.id })
      .andWhere(`createdAt <= :endDate`, { endDate: current })
      .andWhere(`createdAt >= :startDate`, { startDate: startOfMonth })
      .getRawOne();

    if (totalSummary > existEmployee.salary / 2) {
      throw new BadRequestException(
        'The total amount cannot exceed 50% of the salary!!!',
      );
    }

    try {
      const request = this.requestRepository.create({ ...createRequestDto });
      return await request.save();
    } catch (error) {
      throw new BadGatewayException('Cannot create new request!!!');
    }
  }
}
