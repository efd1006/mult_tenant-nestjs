import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { CreateTenancyDto, ReadTenancyDto } from './tenancy.dto';
import { Tenancy } from './tenancy.entity';

@Injectable()
export class TenancyService {
  constructor(
    @InjectRepository(Tenancy)
    private readonly tenancyRepository: Repository<Tenancy>,
  ) {
    // Empty
  }

  async create(tenancy: CreateTenancyDto): Promise<ReadTenancyDto> {
    const createdTenancy = await this.tenancyRepository.save(tenancy);

    return plainToClass(ReadTenancyDto, createdTenancy);
  }

  async findAll(): Promise<ReadTenancyDto[]> {
    const tenancies = await this.tenancyRepository.find();

    return tenancies.map((tenancy) => plainToClass(ReadTenancyDto, tenancy));
  }

  async findOne(name: string): Promise<ReadTenancyDto> {
    return await this.tenancyRepository.findOne({ name });
  }
}
