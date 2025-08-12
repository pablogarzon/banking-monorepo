import { Inject, Injectable } from '@nestjs/common';
import { Company } from 'src/domain/entities/company';
import {
  COMPANY_REPOSITORY,
  type CompanyRepository,
} from 'src/domain/ports/company.repository';
import { CreateCompanyCommand } from '../commands/create-company.command';

@Injectable()
export class RegisterNewCompanyUC {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
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
