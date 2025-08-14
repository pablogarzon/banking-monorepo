import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { GetCompaniesSuscribedSinceUC } from 'src/application/use-cases/get-companies-subscribed-since.uc';
import { GetCompaniesWithTransferSinceUC } from 'src/application/use-cases/get-companies-with-transfer-since.uc';
import { RegisterNewCompanyUC } from 'src/application/use-cases/register-new-company.uc';
import { Company } from 'src/domain/entities/company';
import { CreateCompanyDto } from '../dtos/create-company.dto';

describe('CompanyController', () => {
  let controller: CompanyController;

  const testCompany = new Company('12-3456789-0', 'test', new Date(), 'pyme');
  const mockRegisterNewCompany = { execute: jest.fn((dto) => {}) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        GetCompaniesSuscribedSinceUC,
        GetCompaniesWithTransferSinceUC,
        RegisterNewCompanyUC,
      ],
    })
      .overrideProvider(GetCompaniesSuscribedSinceUC)
      .useValue({ execute: jest.fn((since) => [testCompany]) })
      .overrideProvider(GetCompaniesWithTransferSinceUC)
      .useValue({ execute: jest.fn((since) => [testCompany]) })
      .overrideProvider(RegisterNewCompanyUC)
      .useValue(mockRegisterNewCompany)
      .compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should return companies adhered since', async () => {
    expect(await controller.companiesAdheredSince(new Date())).toHaveLength(1);
  });
  it('should return companies with transfers since', async () => {
    expect(
      await controller.companiesWithTransfersSince(new Date()),
    ).toHaveLength(1);
  });
  test('should add a new company', async () => {
    await controller.register(new CreateCompanyDto())
    expect(mockRegisterNewCompany.execute).toHaveBeenCalled();
  });
});
