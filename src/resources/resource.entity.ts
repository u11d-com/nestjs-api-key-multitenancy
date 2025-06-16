import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Tenant } from 'src/tenants/tenant.entity';

@Entity()
export class Resource extends BaseEntity {
  @ManyToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant;
}
