import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './infra/company.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
      ],
    }),
    CompanyModule,
  ],
})
export class AppModule {}
