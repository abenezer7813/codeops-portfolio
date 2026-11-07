import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
import { DomainErrorFilter } from './restaurants/domain-error.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.setGlobalPrefix("api");
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
app.useGlobalFilters(new DomainErrorFilter());
  await app.listen(process.env.PORT ?? 4000);
}
await bootstrap();
