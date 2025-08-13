import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { getEnvConfig } from './config/env.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const { APP_PORT } = getEnvConfig(configService);

  await app.listen(APP_PORT ?? 3000, '0.0.0.0');
  console.log(`This application is running on: ${await app.getUrl()}`);
}
bootstrap();
