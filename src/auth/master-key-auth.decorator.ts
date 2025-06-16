import { SetMetadata } from '@nestjs/common';

export const MASTER_KEY_AUTH = 'master_key_auth';

export const MasterKeyAuth = () => SetMetadata(MASTER_KEY_AUTH, true);
