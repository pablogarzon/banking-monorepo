import { Module } from '@nestjs/common';
import { CompanyController } from './http-api/controllers/company.controller';
import { GetCompaniesSuscribedLastMonthUC } from 'src/application/use-cases/get-companies-subscribed-last-month.uc';
import { GetCompaniesWithTransferLastMonthUC } from 'src/application/use-cases/get-companies-with-transfer-last-month.uc';
import { RegisterNewCompanyUC } from 'src/application/use-cases/register-new-company.uc';
import { COMPANY_PERSISTENCE_PORT } from 'src/domain/ports/company-persistence.port';
import { InMemoryCompanyRepositoryAdapter } from './db/dev/in-memory-company.repository.adapter';
import { TRANSFER_PERSISTENCE_PORT } from 'src/domain/ports/transfer-persistence.port';
import { InMemoryTransferRepositoryAdapter } from './db/dev/in-memory-transfer.repository.adapter';

@Module({
  controllers: [CompanyController],
  providers: [
    GetCompaniesSuscribedLastMonthUC,
    GetCompaniesWithTransferLastMonthUC,
    RegisterNewCompanyUC,
    {
      provide: COMPANY_PERSISTENCE_PORT,
      useClass: InMemoryCompanyRepositoryAdapter,
    },
    {
      provide: TRANSFER_PERSISTENCE_PORT,
      useClass: InMemoryTransferRepositoryAdapter,
    },
  ],
})
export class CompanyModule {}
