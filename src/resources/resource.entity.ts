import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { BaseEntity } from 'src/base.entity';

@Entity()
export class Resource extends BaseEntity {
  @ManyToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant;
}
