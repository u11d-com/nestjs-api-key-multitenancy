import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';
import { BaseEntity } from 'src/base.entity';

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
