import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/utils/swagger';
import logger from './utils/logger.middleware';
import HttpExceptionFilter from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  setupSwagger(app);
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
