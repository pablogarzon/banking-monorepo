import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_PERSISTENCE_PORT,
  type CompanyPersistencePort,
} from 'src/domain/ports/company-persistence.port';

@Injectable()
export class GetCompaniesSuscribedLastMonthUC {
  constructor(
    @Inject(COMPANY_PERSISTENCE_PORT)
    private readonly companyRepository: CompanyPersistencePort,
  ) {}

  async execute() {
    const dateSince = new Date();
    dateSince.setMonth(dateSince.getMonth() - 1);
    return this.companyRepository.findAdheredSince(dateSince);
  }
}
