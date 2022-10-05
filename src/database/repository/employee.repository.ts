import { Injectable } from '@nestjs/common';
import { PaginationConstants } from 'src/common/constants/pagination.enum';
import { TypeORMRepository } from 'src/database/typeorm.repository';
import { EntityManager, ILike } from 'typeorm';
import { omit } from 'lodash';
import { FilterEmployeeDto } from '@shared/dto/employee';
import { Employee } from '@database/entity';

@Injectable()
export class EmployeeRepository extends TypeORMRepository<Employee> {
  constructor(manager: EntityManager) {
    super(Employee, manager);
  }

  async getAll(filterEmployeeDto: FilterEmployeeDto) {
    const {
      page = PaginationConstants.DEFAULT_PAGE,
      limit = PaginationConstants.DEFAULT_LIMIT_ITEM,
      name,
      email,
    } = filterEmployeeDto;
    const offset = (page - 1) * limit;

    const query = this.createQueryBuilder('employee').take(limit).skip(offset);

    if (name) {
      query.andWhere({ name: ILike(`%${name}%`) });
    }

    if (email) {
      query.andWhere({ email: ILike(`%${email}%`) });
    }

    const [items, totalItems] = await query.getManyAndCount();

    return {
      items,
      pagination: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }
}
