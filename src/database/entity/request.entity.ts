import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { RequestStatusEnum } from 'src/common/constants/request-status.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'requests' })
export class Request extends AbstractEntity {
  @Column({ name: 'employee_code' })
  employeeId: string;

  @Column({ name: 'company_code' })
  companyId: string;

  @Column({ name: 'amount', type: 'float4' })
  amount: number;

  @Column({ name: 'status', default: RequestStatusEnum.PENDING })
  password: string;
}
