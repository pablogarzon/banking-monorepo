import { Company } from './../../domain/entities';
import {
  type CompanyPersistencePort,
} from './../../domain/ports';
import {
  type TransferPersistencePort,
} from './../../domain/ports';

export class GetCompaniesWithTransferSinceUC {
  constructor(
    private readonly companyRepository: CompanyPersistencePort,
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
