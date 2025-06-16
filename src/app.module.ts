import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './tenants/tenants.module';
import { ApiKeysModule } from './api-keys/api-keys.module';
import { ResourcesModule } from './resources/resources.module';
import { typeOrmConfig } from './typeorm-config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TenantsModule,
    ApiKeysModule,
    ResourcesModule,
  ],
})
export class AppModule {}
