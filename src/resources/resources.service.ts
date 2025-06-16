import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';
import { CreateResourceDto } from './create-resource.dto';
import { TenantsService } from '../tenants/tenants.service';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourcesRepository: Repository<Resource>,
    private readonly tenantsService: TenantsService,
  ) {}

  async create(tenantId: number, dto: CreateResourceDto): Promise<Resource> {
    const tenant = await this.tenantsService.checkExists(tenantId);

    const resource = this.resourcesRepository.create({
      ...dto,
      tenant,
    });

    return this.resourcesRepository.save(resource);
  }

  async findAllByTenant(tenantId: number): Promise<Resource[]> {
    await this.tenantsService.checkExists(tenantId);

    return this.resourcesRepository.find({
      where: { tenant: { id: tenantId } },
    });
  }
}
