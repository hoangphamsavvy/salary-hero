import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { RoleEnum } from 'src/common/constants/role.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '@database/entity';

@Entity({ name: 'employees' })
export class Employee extends AbstractEntity {
  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'companyId' })
  companyId: string;

  @Column({ name: 'name' })
  name: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    name: 'role',
    default: RoleEnum.EMPLOYEE,
  })
  role: RoleEnum;

  @Column({ name: 'salary', type: 'float4' })
  salary: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
