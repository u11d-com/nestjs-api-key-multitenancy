import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './create-resource.dto';
import { TenantIdParam } from '../tenant-id.param';
import { Resource } from './resource.entity';

@Controller('tenants/:tenantId/resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  async create(
    @TenantIdParam() tenantId: number,
    @Body() createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    return this.resourcesService.create(tenantId, createResourceDto);
  }

  @Get()
  async findAll(@TenantIdParam() tenantId: number): Promise<Resource[]> {
    return this.resourcesService.findAllByTenant(tenantId);
  }
}
