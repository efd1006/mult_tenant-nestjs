import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateUserDto, ReadUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    // Empty
  }

  @Get()
  async findAll(): Promise<ReadUserDto[]> {
    return this.userService.findAll();
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<ReadUserDto> {
    return this.userService.create(user);
  }
}
