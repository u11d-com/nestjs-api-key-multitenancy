import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tenant } from './tenants/tenant.entity';
import { ApiKey } from './api-keys/api-key.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || '') || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: 'api_key_multitenancy_demo',
  entities: [Tenant, ApiKey],
  synchronize: true, // !!! WARNING: Set to false before go to production
};
