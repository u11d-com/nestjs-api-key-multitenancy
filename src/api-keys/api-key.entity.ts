import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Tenant } from 'src/tenants/tenant.entity';

@Entity()
export class ApiKey extends BaseEntity {
  @Column()
  valueLast4: string;

  @Column()
  hash: string;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant;
}
