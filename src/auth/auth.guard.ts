import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ApiKeysService } from '../api-keys/api-keys.service';
import { TENANT_KEY_AUTH } from './tenant-key-auth.decorator';
import { MASTER_KEY_AUTH } from './master-key-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  private readonly masterKey: string =
    process.env.MASTER_API_KEY || 'secret_master_api_key';

  constructor(
    private readonly apiKeysService: ApiKeysService,
    private readonly reflector: Reflector,
  ) {}

  private isDecoratorPresent(
    context: ExecutionContext,
    decorator: string,
  ): boolean {
    return Boolean(
      this.reflector.getAllAndOverride(decorator, [
        context.getHandler(),
        context.getClass(),
      ]) || false,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isMasterKeyAllowed = this.isDecoratorPresent(
      context,
      MASTER_KEY_AUTH,
    );
    const isTenantKeyAllowed = this.isDecoratorPresent(
      context,
      TENANT_KEY_AUTH,
    );

    const apiKey = request.headers['x-api-key'];
    if (!apiKey) {
      throw new UnauthorizedException(
        'API key is required in the request headers',
      );
    }

    if (typeof apiKey !== 'string') {
      throw new BadRequestException('API key must be a string');
    }

    if (isMasterKeyAllowed) {
      if (this.masterKey === apiKey) {
        this.logger.warn('Master key used for authentication');
        return true;
      }

      throw new ForbiddenException('Invalid master API key');
    }

    if (!isTenantKeyAllowed) {
      throw new NotImplementedException('Unexpected authentication method');
    }

    const pathTenantId = request.params.tenantId;

    const apiKeyTenantId =
      await this.apiKeysService.getTenantIdByKeyValue(apiKey);

    if (!apiKeyTenantId) {
      throw new ForbiddenException('Invalid API key');
    }

    if (apiKeyTenantId !== pathTenantId) {
      throw new ForbiddenException(
        'You are not authorized to access this tenant',
      );
    }

    this.logger.debug(`API key is valid for tenant ${apiKeyTenantId}.`);
    return true;
  }
}
