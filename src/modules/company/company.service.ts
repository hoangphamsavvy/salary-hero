import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from '@database/repository';
import {
  CreateCompanyDto,
  UpdateCompanyDto,
  FilterCompanyDto,
} from '@shared/dto/company';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const existCompany = await this.companyRepository.findOne({
      where: { name: createCompanyDto.name, address: createCompanyDto.address },
    });
    if (existCompany) {
      throw new BadRequestException('Company already exist!!!');
    }

    try {
      const company = this.companyRepository.create({
        ...createCompanyDto,
      });
      return await company.save();
    } catch (error) {
      throw new BadGatewayException('Cannot create new company!!!');
    }
  }

  async getAll(filterCompanyDto: FilterCompanyDto) {
    try {
      return await this.companyRepository.getAll(filterCompanyDto);
    } catch (error) {
      throw new BadGatewayException('Cannot get companies!!!');
    }
  }

  async getById(id: string) {
    try {
      const company = await this.companyRepository.findOne({
        where: { id },
      });
      if (!company) {
        throw new NotFoundException('Company not found!!!');
      }
      return company;
    } catch (error) {
      throw new BadGatewayException('Cannot get the company!!!');
    }
  }

  async updateById(id: string, updateCompanyDto: UpdateCompanyDto) {
    try {
      const existCompany = await this.companyRepository.findOne({
        where: { id },
      });
      if (!existCompany) {
        throw new NotFoundException('Company not found!!!');
      }
      await this.companyRepository.update({ id }, { ...updateCompanyDto });
    } catch (error) {
      throw new BadGatewayException('Cannot update the company!!!');
    }
  }

  async deleteById(id: string) {
    try {
      const existCompany = await this.companyRepository.findOne({
        where: { id },
      });
      if (!existCompany) {
        throw new NotFoundException('Company not found!!!');
      }
      await this.companyRepository.softDelete({ id });
    } catch (error) {
      throw new BadGatewayException('Cannot delete the company!!!');
    }
  }
}
