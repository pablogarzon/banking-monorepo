import { Company } from '../../domain/entities/company';
import {
  type CompanyPersistencePort,
} from '../../domain/ports/company-persistence.port';
import { CreateCompanyCommand } from '../commands/create-company.command';

export class RegisterNewCompanyUC {
  constructor(
    private readonly companyRepository: CompanyPersistencePort,
  ) {}

  async execute(command: CreateCompanyCommand) {
    const company = new Company(
      command.cuit,
      command.razonSocial,
      command.fechaAdhesion,
      command.tipo,
    );
    await this.companyRepository.save(company);
  }
}