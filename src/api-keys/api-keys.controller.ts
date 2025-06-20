import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { TenantIdParam } from 'src/common/tenant-id.param';
import { MasterKeyAuth } from 'src/auth/master-key-auth.decorator';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './create-api-key.dto';
import { UpdateApiKeyDto } from './update-api-key.dto';
import { ApiKeyModel } from './api-key.model';
import { ApiKeyWithRawValueModel } from './api-key-with-raw-value.model';

@MasterKeyAuth()
@Controller('tenants/:tenantId/api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  async create(
    @TenantIdParam() tenantId: string,
    @Body() createApiKeyDto: CreateApiKeyDto,
  ): Promise<ApiKeyWithRawValueModel> {
    const result = await this.apiKeysService.create(tenantId, createApiKeyDto);

    return {
      id: result.apiKey.id,
      name: result.apiKey.name,
      valueLast4: result.apiKey.valueLast4,
      expiresAt: result.apiKey.expiresAt,
      active: result.apiKey.active,
      rawValue: result.rawValue,
    };
  }

  @Get()
  async findAll(@TenantIdParam() tenantId: string): Promise<ApiKeyModel[]> {
    const apiKeys = await this.apiKeysService.findAllByTenant(tenantId);

    // Exclude the hash from the response, as it should not be exposed to the user.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return apiKeys.map(({ hash, ...apiKey }) => apiKey);
  }

  @Patch(':apiKeyId')
  async updateStatus(
    @TenantIdParam() tenantId: string,
    @Param('apiKeyId') apiKeyId: string,
    @Body() dto: UpdateApiKeyDto,
  ): Promise<ApiKeyModel> {
    const apiKey = await this.apiKeysService.updateStatus(
      tenantId,
      apiKeyId,
      dto.active,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...result } = apiKey;
    return result;
  }
}
