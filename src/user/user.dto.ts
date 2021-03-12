import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
class CreateUserDto {
  @IsString()
  @Expose()
  readonly name: string;
}

@Exclude()
class ReadUserDto {
  @IsNumber()
  @Expose()
  readonly user_id: number;

  @IsString()
  @Expose()
  readonly name: string;
}

export { CreateUserDto, ReadUserDto };
