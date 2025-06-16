import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

export const TenantIdParam = createParamDecorator(
  (paramName: string = 'tenantId', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const params = request.params || {};

    const tenantId = Number(params[paramName]);

    if (typeof tenantId !== 'number' || isNaN(tenantId)) {
      throw new BadRequestException('Invalid tenant ID provided');
    }

    return tenantId;
  },
);
