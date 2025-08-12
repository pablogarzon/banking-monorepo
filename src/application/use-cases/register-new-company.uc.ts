import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/domain/entities/company';
import {
  COMPANY_PERSISTENCE_PORT,
  type CompanyPersistencePort,
} from 'src/domain/ports/company-persistence.port';
import { CreateCompanyCommand } from '../commands/create-company.command';

@Injectable()
export class RegisterNewCompanyUC {
  constructor(
    @Inject(COMPANY_PERSISTENCE_PORT)
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
