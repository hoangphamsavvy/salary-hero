import { Injectable } from '@nestjs/common';
import { TypeORMRepository } from 'src/database/typeorm.repository';
import { EntityManager } from 'typeorm';
import { Request } from '../entity/request.entity';

@Injectable()
export class RequestRepository extends TypeORMRepository<Request> {
  constructor(manager: EntityManager) {
    super(Request, manager);
  }
}
