import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyController } from '@company/company.controller';
import { CompanyService } from '@company/company.service';
import { Company } from '@database/entity';
import { CompanyRepository } from '@database/repository';
import { UserModule } from '@user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), UserModule],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [],
})
export class CompanyModule {}
