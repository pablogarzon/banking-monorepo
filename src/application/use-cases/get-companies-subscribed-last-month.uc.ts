import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from 'src/domain/ports/company.repository';

@Injectable()
export class GetCompaniesSuscribedLastMonthUC {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async execute() {
    const dateSince = new Date();
    dateSince.setMonth(dateSince.getMonth() - 1);
    return this.companyRepository.findAdheredSince(dateSince);
  }
}
