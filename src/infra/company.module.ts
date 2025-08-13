import { Module } from '@nestjs/common';
import { CompanyController } from './http-api/controllers/company.controller';
import { GetCompaniesSuscribedLastMonthUC } from 'src/application/use-cases/get-companies-subscribed-last-month.uc';
import { GetCompaniesWithTransferLastMonthUC } from 'src/application/use-cases/get-companies-with-transfer-last-month.uc';
import { RegisterNewCompanyUC } from 'src/application/use-cases/register-new-company.uc';
import { COMPANY_PERSISTENCE_PORT } from 'src/domain/ports/company-persistence.port';
import { TRANSFER_PERSISTENCE_PORT } from 'src/domain/ports/transfer-persistence.port';
import { CompanyPersistenceAdapter } from './db/adapters/company-persistence.adapter';
import { TransferPersitenceAdapter } from './db/adapters/transfer-persistence.adapter';
import { DatabaseProviderModule } from './db/providers/database.provider';

@Module({
  imports: [DatabaseProviderModule],
  controllers: [CompanyController],
  providers: [
    GetCompaniesSuscribedLastMonthUC,
    GetCompaniesWithTransferLastMonthUC,
    RegisterNewCompanyUC,
    {
      provide: COMPANY_PERSISTENCE_PORT,
      useClass: CompanyPersistenceAdapter,
    },
    {
      provide: TRANSFER_PERSISTENCE_PORT,
      useClass: TransferPersitenceAdapter,
    },
  ],
})
export class CompanyModule {}
