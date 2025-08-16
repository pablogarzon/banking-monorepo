import { ConfigService } from '@nestjs/config';

export const getEnvConfig = (configService: ConfigService) => ({
  APP_PORT: configService.get<number>('APP_PORT', 3005),
  DB_HOST: configService.get<string>('DB_HOST', 'localhost'),
  DB_PORT: configService.get<number>('DB_PORT', 5432),
  DB_USERNAME: configService.get<string>('DB_USERNAME'),
  DB_PASSWORD: configService.get<string>('DB_PASSWORD'),
  DB_NAME: configService.get<string>('DB_NAME', 'database.sqlite'),
});
