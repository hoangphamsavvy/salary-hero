import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { RequestStatusEnum } from 'src/common/constants/request-status.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'requests' })
export class Request extends AbstractEntity {
  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ name: 'amount', type: 'float4' })
  amount: number;
}
