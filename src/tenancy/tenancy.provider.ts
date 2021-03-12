import { Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Connection, getConnection } from 'typeorm';
import { Tenancy } from './tenancy.entity';

const TENANT_CONNECTION = 'TENANT_CONNECTION';

const TenancyProvider: Provider = {
  provide: TENANT_CONNECTION,
  inject: [REQUEST, Connection],
  scope: Scope.REQUEST,
  useFactory: async (request: Request, connection: Connection) => {
    const name: string = request.params['tenancy'];

    const tenancy: Tenancy = await connection
      .getRepository(Tenancy)
      .findOne({ where: { name } });

    return getConnection(tenancy.name);
  },
};

export { TENANT_CONNECTION, TenancyProvider };
