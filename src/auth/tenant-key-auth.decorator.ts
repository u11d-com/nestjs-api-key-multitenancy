import { SetMetadata } from '@nestjs/common';

export const TENANT_KEY_AUTH = 'tenant_key_auth';

export const TenantKeyAuth = () => SetMetadata(TENANT_KEY_AUTH, true);
