import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_PERSISTENCE_PORT,
  type CompanyPersistencePort,
} from 'src/domain/ports/company-persistence.port';

@Injectable()
export class GetCompaniesSuscribedSinceUC {
  constructor(
    @Inject(COMPANY_PERSISTENCE_PORT)
    private readonly companyRepository: CompanyPersistencePort,
  ) {}

  async execute(dateSince: Date) {
    return this.companyRepository.findAdheredSince(dateSince);
  }
}
