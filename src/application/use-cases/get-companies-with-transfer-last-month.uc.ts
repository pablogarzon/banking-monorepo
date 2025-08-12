import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/domain/entities/company';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from 'src/domain/ports/company.repository';
import {
  TRANSFER_REPOSITORY,
  type TransferRepository,
} from 'src/domain/ports/transfer.repository';

@Injectable()
export class GetCompaniesWithTransferLastMonthUC {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
    @Inject(TRANSFER_REPOSITORY)
    private readonly transferRepository: TransferRepository,
  ) {}

  async execute() {
    const dateSince = new Date();
    dateSince.setMonth(dateSince.getMonth() - 1);
    
    const transfers =
      await this.transferRepository.findTransfersSince(dateSince);
    const cuits = Array.from(new Set(transfers.map((t) => t.empresaCuit)));
    const companies = await Promise.all(
      cuits.map((c) => this.companyRepository.findByCuit(c)),
    );
    return companies.filter((c): c is Company => c !== null);
  }
}


