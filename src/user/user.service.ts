import { Inject, Injectable, Scope } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Connection, Repository } from 'typeorm';

import { TENANT_CONNECTION } from 'src/tenancy/tenancy.provider';
import { CreateUserDto, ReadUserDto } from './user.dto';
import { User } from './user.entity';

// A cada request é feita um nova instância da classe
@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private readonly userRepository: Repository<User>;

  // Cada nova instância, criada a cada request, verifica através
  // do tenancy.provider (conexão), qual é o tenant atual
  constructor(@Inject(TENANT_CONNECTION) connection: Connection) {
    this.userRepository = connection.getRepository(User);
  }

  async findAll(): Promise<ReadUserDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => plainToClass(ReadUserDto, user));
  }

  async create(user: CreateUserDto): Promise<ReadUserDto> {
    const createdUser = await this.userRepository.save(user);

    return plainToClass(ReadUserDto, createdUser);
  }
}
