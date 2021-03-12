import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(':tenancy?/api');

  const { port } = AppModule;

  await app.listen(port, () => console.log(`Server running in port ${port}`));
}
bootstrap();
