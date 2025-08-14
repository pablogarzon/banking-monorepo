import { Test, TestingModule } from '@nestjs/testing';
import { RegisterNewCompanyUC } from './register-new-company.uc';
import {
  COMPANY_PERSISTENCE_PORT,
  CompanyPersistencePort,
} from 'src/domain/ports/company-persistence.port';
import { CreateCompanyCommand } from '../commands/create-company.command';

describe('RegisterNewCompanyUC', () => {
  let service: RegisterNewCompanyUC;
  let companyRepository: jest.Mocked<CompanyPersistencePort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterNewCompanyUC,
        {
          provide: COMPANY_PERSISTENCE_PORT,
          useValue: {
            save: jest.fn(),
            findAdheredSince: jest.fn(),
            findByCuit: jest.fn(),
          } as jest.Mocked<CompanyPersistencePort>,
        },
      ],
    }).compile();

    service = module.get<RegisterNewCompanyUC>(RegisterNewCompanyUC);
    companyRepository = module.get(COMPANY_PERSISTENCE_PORT);
  });

  it('should add a new company', async () => {
    const command: CreateCompanyCommand = {
      cuit: '20-12345678-9',
      razonSocial: 'Mock S.A.',
      fechaAdhesion: new Date('2025-08-13'),
      tipo: 'pyme',
    };

    await service.execute(command);

    expect(companyRepository.save).toHaveBeenCalledTimes(1);

    const savedCompany = (companyRepository.save as jest.Mock).mock.calls[0][0];
    expect(savedCompany.cuit).toBe(command.cuit);
    expect(savedCompany.razonSocial).toBe(command.razonSocial);
    expect(savedCompany.fechaAdhesion).toEqual(command.fechaAdhesion);
    expect(savedCompany.tipo).toBe(command.tipo);
  });
});
