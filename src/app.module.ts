import { Module } from '@nestjs/common';
import { DataBaseModule } from '@database/database.module';
import { CompanyModule } from '@company/company.module';
import { EmployeeModule } from '@employee/employee.module';
import { RequestModule } from '@request/request.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    DataBaseModule,
    SharedModule,
    UserModule,
    CompanyModule,
    EmployeeModule,
    RequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
