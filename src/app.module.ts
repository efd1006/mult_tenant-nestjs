import { Module } from '@nestjs/common';
import { TenancyModule } from './tenancy/tenancy.module';

@Module({
  imports: [TenancyModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  // Empty
}
