import { OmitType } from '@nestjs/mapped-types';
import { ApiKey } from './api-key.entity';

// Hash should not be exposed in the API response
export class ApiKeyModel extends OmitType(ApiKey, ['hash', 'tenant']) {}
