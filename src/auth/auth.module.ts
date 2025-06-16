import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeysModule } from 'src/api-keys/api-keys.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [ApiKeysModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
