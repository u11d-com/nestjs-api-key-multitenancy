import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from './tenants/tenants.module';
import { typeOrmConfig } from './typeorm-config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TenantsModule],
})
export class AppModule {}
