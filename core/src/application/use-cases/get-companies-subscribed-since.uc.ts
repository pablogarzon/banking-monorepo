import { type CompanyPersistencePort } from './../../domain/ports';

export class GetCompaniesSuscribedSinceUC {
  constructor(private readonly companyRepository: CompanyPersistencePort) {}

  async execute(dateSince: Date) {
    return this.companyRepository.findAdheredSince(dateSince);
  }
}
