import { Body, Controller, Get, Post } from '@nestjs/common';
import { MasterKeyAuth } from 'src/auth/master-key-auth.decorator';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './create-tenant.dto';
import { Tenant } from './tenant.entity';

@MasterKeyAuth()
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto): Promise<Tenant> {
    return this.tenantsService.create(dto);
  }

  @Get()
  async findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
