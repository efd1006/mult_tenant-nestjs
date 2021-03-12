import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateTenancyDto, ReadTenancyDto } from './tenancy.dto';
import { TenancyService } from './tenancy.service';

@Controller('tenancy')
export class TenancyController {
  constructor(private readonly tenancyService: TenancyService) {
    // Empty
  }

  @Post()
  create(@Body() tenancy: CreateTenancyDto): Promise<ReadTenancyDto> {
    return this.tenancyService.create(tenancy);
  }

  @Get()
  findAll(): Promise<ReadTenancyDto[]> {
    return this.tenancyService.findAll();
  }

  // @Get()
  // findOne(): Promise<ReadTenancyDto> {
  //   return this.tenancyService.findOne(name);
  // }
}
