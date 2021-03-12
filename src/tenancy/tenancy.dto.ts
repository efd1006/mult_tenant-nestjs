import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

class CreateTenancyDto {
  @IsString()
  readonly name: string;
}

class ReadTenancyDto {
  @IsNumber()
  @Expose()
  readonly tenancy_id: number;

  @IsString()
  @Expose()
  readonly name: string;
}

export { CreateTenancyDto, ReadTenancyDto };
