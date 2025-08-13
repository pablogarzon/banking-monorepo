import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { TransferEntity } from '../entities/transfer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydatabase',
      entities: [CompanyEntity, TransferEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CompanyEntity, TransferEntity]),
  ],
  exports: [TypeOrmModule],
})
export class PostgresqlProviderModule {}
