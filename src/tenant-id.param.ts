import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { isUUID } from 'class-validator';

export const TenantIdParam = createParamDecorator(
  (paramName: string = 'tenantId', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const params = request.params || {};

    const tenantId = params[paramName];

    if (!tenantId || !isUUID(tenantId)) {
      throw new BadRequestException('Invalid tenant ID provided');
    }

    return tenantId;
  },
);
