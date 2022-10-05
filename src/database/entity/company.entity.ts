import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Column, Entity, OneToMany, JoinColumn } from 'typeorm';
import { Employee } from '@database/entity';

@Entity({ name: 'companies' })
export class Company extends AbstractEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @OneToMany(() => Employee, (employee) => employee.companyId)
  @JoinColumn({ name: 'companyId' })
  employees: Employee[];
}
