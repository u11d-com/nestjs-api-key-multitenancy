import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsModule } from 'src/tenants/tenants.module';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';
import { ApiKey } from './api-key.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApiKey]),
    CacheModule.register({
      useFactory: () => ({
        stores: [createKeyv(process.env.REDIS_URL || 'redis://localhost:6379')],
      }),
    }),
    TenantsModule,
  ],
  controllers: [ApiKeysController],
  providers: [ApiKeysService],
  exports: [ApiKeysService],
})
export class ApiKeysModule {}
