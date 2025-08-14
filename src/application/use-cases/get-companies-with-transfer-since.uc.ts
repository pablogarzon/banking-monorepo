import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/domain/entities/company';
import {
  COMPANY_PERSISTENCE_PORT,
  type CompanyPersistencePort,
} from 'src/domain/ports/company-persistence.port';
import {
  TRANSFER_PERSISTENCE_PORT,
  type TransferPersistencePort,
} from 'src/domain/ports/transfer-persistence.port';

@Injectable()
export class GetCompaniesWithTransferSinceUC {
  constructor(
    @Inject(COMPANY_PERSISTENCE_PORT)
    private readonly companyRepository: CompanyPersistencePort,
    @Inject(TRANSFER_PERSISTENCE_PORT)
    private readonly transferRepository: TransferPersistencePort,
  ) {}

  async execute(dateSince: Date): Promise<Company[]> {
    const transfers =
      await this.transferRepository.findTransfersSince(dateSince);
    const cuits = Array.from(new Set(transfers.map((t) => t.empresaCuit)));
    const companies = await Promise.all(
      cuits.map((c) => this.companyRepository.findByCuit(c)),
    );
    return companies.filter((c): c is Company => c !== null);
  }
}
