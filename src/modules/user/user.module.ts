import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CompanyRepository,
  EmployeeRepository,
  UserRepository,
} from '@database/repository';
import { UserController } from '@user/user.controller';
import { User } from '@database/entity';
import { UserService } from '@user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    CompanyRepository,
    EmployeeRepository,
    UserRepository,
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
