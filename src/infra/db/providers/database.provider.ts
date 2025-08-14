import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { TransferEntity } from '../entities/transfer.entity';
import { getEnvConfig } from 'src/config/env.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } =
          getEnvConfig(configService);

        const entities = [CompanyEntity, TransferEntity];

        if (process.env.NODE_ENV === 'production') {
          return {
            type: 'postgres',
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_NAME,
            entities: entities,
            synchronize: true,
          };
        } else {
          return {
            type: 'sqlite',
            database: DB_NAME,
            entities: entities,
            synchronize: true,
          };
        }
      },
    }),
    TypeOrmModule.forFeature([CompanyEntity, TransferEntity]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseProviderModule {}
