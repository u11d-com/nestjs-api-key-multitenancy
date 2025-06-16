import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { createHash, pbkdf2Sync, randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { TenantsService } from 'src/tenants/tenants.service';
import { ApiKey } from './api-key.entity';
import { CreateApiKeyDto } from './create-api-key.dto';

@Injectable()
export class ApiKeysService {
  private readonly saltKey = process.env.SALT_KEY || 'secret_salt_key';
  private readonly iterations = 1024;
  private readonly keyLength = 32;

  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeysRepository: Repository<ApiKey>,
    private readonly tenantsService: TenantsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private generateApiKeyValue(): string {
    return randomBytes(32).toString('hex');
  }

  private hashApiKey(key: string): string {
    const salt = pbkdf2Sync(
      this.saltKey,
      createHash('sha256')
        .update(`${key.at(4)}${this.saltKey}${key.at(key.length - 4)}`)
        .digest('hex'),
      this.iterations,
      this.keyLength,
      'sha256',
    ).toString('hex');

    const hash = pbkdf2Sync(
      key,
      salt,
      this.iterations,
      this.keyLength,
      'sha512',
    ).toString('hex');

    return hash;
  }

  async create(
    tenantId: string,
    dto: CreateApiKeyDto,
  ): Promise<{ apiKey: ApiKey; rawValue: string }> {
    const tenant = await this.tenantsService.checkExists(tenantId);

    const rawValue = this.generateApiKeyValue();
    const hash = this.hashApiKey(rawValue);
    const valueLast4 = rawValue.slice(-4);

    const apiKey = this.apiKeysRepository.create({
      name: dto.name,
      expiresAt: dto.expiresAt,
      hash,
      valueLast4,
      tenant,
    });

    const ttl = dto.expiresAt
      ? new Date(dto.expiresAt).getTime() - new Date().getTime()
      : 0;

    await Promise.all([
      this.cacheManager.set(hash, tenantId, ttl),
      this.apiKeysRepository.save(apiKey),
    ]);

    return {
      apiKey,
      rawValue,
    };
  }

  async findAllByTenant(tenantId: string): Promise<ApiKey[]> {
    await this.tenantsService.checkExists(tenantId);

    return this.apiKeysRepository.find({
      where: { tenant: { id: tenantId } },
    });
  }

  async getTenantIdByKeyValue(apiKeyValue: string): Promise<string | null> {
    const hashedKey = this.hashApiKey(apiKeyValue);
    const apiKeyTenantId = await this.cacheManager.get(hashedKey);

    if (typeof apiKeyTenantId !== 'string') {
      return null;
    }

    return apiKeyTenantId;
  }
}
