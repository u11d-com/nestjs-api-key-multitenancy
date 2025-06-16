import { ApiKeyModel } from './api-key.model';

// User should be able to see the raw value of the API key when creating it.
export class ApiKeyWithRawValueModel extends ApiKeyModel {
  rawValue: string;
}
