import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tenant } from '../tenants/tenant.entity';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
