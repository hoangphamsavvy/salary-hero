import { Injectable } from '@nestjs/common';
import { PaginationConstants } from 'src/common/constants/pagination.enum';
import { TypeORMRepository } from 'src/database/typeorm.repository';
import { EntityManager, ILike } from 'typeorm';
import { Company } from '@database/entity';
import { FilterCompanyDto } from '@shared/dto/company';

@Injectable()
export class CompanyRepository extends TypeORMRepository<Company> {
  constructor(manager: EntityManager) {
    super(Company, manager);
  }

  async getAll(filterCompanyDto: FilterCompanyDto) {
    const {
      page = PaginationConstants.DEFAULT_PAGE,
      limit = PaginationConstants.DEFAULT_LIMIT_ITEM,
      name,
    } = filterCompanyDto;
    const offset = (page - 1) * limit;

    const query = this.createQueryBuilder('company').take(limit).skip(offset);

    if (name) {
      query.andWhere({ name: ILike(`%${name}%`) });
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
