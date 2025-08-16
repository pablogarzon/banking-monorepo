import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getEnvConfig } from './config/env.config';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si vienen propiedades extra
      transform: true, // Transforma tipos primitivos
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hexagonal API example')
    .setDescription('Gestión de empresas y sus transferencias')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const configService = app.get(ConfigService);
  const { APP_PORT } = getEnvConfig(configService);

  await app.listen(APP_PORT ?? 3005, '0.0.0.0');
  console.log(`This application is running on: ${await app.getUrl()}`);
}
bootstrap();
