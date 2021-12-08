import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('AppInit');

  logger.log('Setting up an app');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 5000;

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('AuthService')
    .setDescription('Auth service for Bookface app')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    logger.log(`App running on port ${port}`);
  });
}

bootstrap();
