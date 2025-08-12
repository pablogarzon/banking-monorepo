import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { TransferEntity } from '../entities/transfer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [CompanyEntity, TransferEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CompanyEntity, TransferEntity]),
  ],
  exports: [TypeOrmModule],
})
export class SqliteProviderModule {}
