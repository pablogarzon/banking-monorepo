import { Module } from '@nestjs/common';
import { CompanyController } from './http-api/controllers/company.controller';
import {
  GetCompaniesSuscribedSinceUC,
  GetCompaniesWithTransferSinceUC,
  RegisterNewCompanyUC,
} from '@bank-monorepo/core';
import { CompanyPersistenceAdapter } from './db/adapters/company-persistence.adapter';
import { TransferPersistenceAdapter } from './db/adapters/transfer-persistence.adapter';
import { DatabaseProviderModule } from './db/providers/database.provider';

const COMPANY_PERSISTENCE_PORT = Symbol('COMPANY_PERSISTENCE_PORT');
const TRANSFER_PERSISTENCE_PORT = Symbol('TRANSFER_PERSISTENCE_PORT');

@Module({
  imports: [DatabaseProviderModule],
  controllers: [CompanyController],
  providers: [
    {
      provide: COMPANY_PERSISTENCE_PORT,
      useClass: CompanyPersistenceAdapter,
    },
    {
      provide: TRANSFER_PERSISTENCE_PORT,
      useClass: TransferPersistenceAdapter,
    },
    {
      provide: GetCompaniesSuscribedSinceUC,
      useFactory: (repo: CompanyPersistenceAdapter) =>
        new GetCompaniesSuscribedSinceUC(repo),
      inject: [COMPANY_PERSISTENCE_PORT],
    },
    {
      provide: GetCompaniesWithTransferSinceUC,
      useFactory: (
        companyRepo: CompanyPersistenceAdapter,
        transferRepo: TransferPersistenceAdapter,
      ) => new GetCompaniesWithTransferSinceUC(companyRepo, transferRepo),
      inject: [COMPANY_PERSISTENCE_PORT, TRANSFER_PERSISTENCE_PORT],
    },
    {
      provide: RegisterNewCompanyUC,
      useFactory: (companyRepo: CompanyPersistenceAdapter) =>
        new RegisterNewCompanyUC(companyRepo),
      inject: [COMPANY_PERSISTENCE_PORT],
    },
  ],
})
export class CompanyModule {}
