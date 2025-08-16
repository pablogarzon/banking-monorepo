import { RegisterNewCompanyUC } from './register-new-company.uc';
import { CompanyPersistencePort } from '../../domain/ports/company-persistence.port';
import { CreateCompanyCommand } from '../commands/create-company.command';

describe('RegisterNewCompanyUC', () => {
  let service: RegisterNewCompanyUC;
  let companyRepository: jest.Mocked<CompanyPersistencePort>;

  beforeEach(async () => {
    companyRepository = {
      save: jest.fn(),
      findAdheredSince: jest.fn(),
      findByCuit: jest.fn(),
    };

    service = new RegisterNewCompanyUC(companyRepository);
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
