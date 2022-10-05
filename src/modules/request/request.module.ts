import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestRepository, EmployeeRepository } from '@database/repository';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestModule])],
  controllers: [RequestController],
  providers: [EmployeeRepository, RequestRepository, RequestService],
  exports: [],
})
export class RequestModule {}
