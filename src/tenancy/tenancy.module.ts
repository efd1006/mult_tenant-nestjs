import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection, getConnection } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

import { TenancyService } from './tenancy.service';
import { TenancyController } from './tenancy.controller';
import { Tenancy } from './tenancy.entity';
import { User } from 'src/user/user.entity';
import { TenancyProvider } from './tenancy.provider';

@Module({
  // Acesso ao database
  imports: [TypeOrmModule.forFeature([Tenancy])],
  providers: [TenancyService, TenancyProvider],
  exports: [TenancyProvider],
  controllers: [TenancyController],
})
export class TenancyModule {
  constructor(
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly tenancyService: TenancyService,
  ) {
    // Empty
  }

  // Todas as classes de modulos possuem o método "configure"
  // onde se configura os middleware necessários
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        async (request: Request, response: Response, next: NextFunction) => {
          // silbeck.com/tenancyHotelName/api
          const name: string = request.params['tenancy'];
          const tenancy: Tenancy = await this.tenancyService.findOne(name);

          if (!tenancy) {
            throw new BadRequestException(
              'Database Connection Error',
              'This tenancy does not exists!',
            );
          }

          try {
            getConnection(tenancy.name);
            next();
          } catch (error) {
            // Not supported in Postgres
            await this.connection.query(
              `CREATE DATABASE IF NOT EXISTS ${tenancy.name}`,
            );

            const createdConnection: Connection = await createConnection({
              name: tenancy.name,
              type: 'mysql',
              host: this.configService.get('DB_HOST'),
              username: this.configService.get('DB_USER'),
              password: this.configService.get('DB_PASSWORD'),
              port: this.configService.get('DB_PORT'),
              database: tenancy.name,
              synchronize: true,
              entities: [User],
            });

            if (createdConnection) {
              next();
            } else {
              throw new BadRequestException(
                'Database Connection Error',
                'This is a Error with the Database!',
              );
            }
          }
        },
      )
      .exclude({ path: '/api/tenancy', method: RequestMethod.ALL })
      .forRoutes('*');
  }
}
