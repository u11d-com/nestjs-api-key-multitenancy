import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Tenant } from './tenants/tenant.entity';
import { ApiKey } from './api-keys/api-key.entity';
import { Resource } from './resources/resource.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url:
    process.env.POSTGRES_URL ||
    'postgresql://postgres:postgres@localhost:5432/api_key_multitenancy_demo',
  entities: [Tenant, ApiKey, Resource],
  synchronize: true, // !!! WARNING: Set to false before go to production
};
