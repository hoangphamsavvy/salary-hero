import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyRepository } from '../../database/repository/company.repository';
import { EmployeeController } from './employee.controller';
import { Employee } from '@database/entity';
import { EmployeeRepository } from '@database/repository';
import { EmployeeService } from '@employee/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [EmployeeRepository, CompanyRepository, EmployeeService],
  exports: [],
})
export class EmployeeModule {}
