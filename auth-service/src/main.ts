import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('AppInit');

  logger.log('Setting up an app');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 5000;

  app.setGlobalPrefix('api');

  await app.listen(port, () => {
    logger.log(`App running on port ${port}`);
  });
}

bootstrap();
