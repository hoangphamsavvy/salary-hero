import { RoleEnum } from '@common/constants/role.enum';
import { AbstractEntity } from 'src/common/abstracts/entity.abstract';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ name: 'email', unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    name: 'role',
    default: RoleEnum.SUPER_ADMIN,
  })
  role: RoleEnum;
}
