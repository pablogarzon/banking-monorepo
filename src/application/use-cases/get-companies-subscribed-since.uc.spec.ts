import { Test, TestingModule } from '@nestjs/testing';
import {
  COMPANY_PERSISTENCE_PORT,
  CompanyPersistencePort,
} from 'src/domain/ports/company-persistence.port';
import { Company } from 'src/domain/entities/company';
import { GetCompaniesSuscribedSinceUC } from './get-companies-subscribed-since.uc';

describe('GetCompaniesSuscribedSinceUC', () => {
  let service: GetCompaniesSuscribedSinceUC;

  let mockCompanyRepository: jest.Mocked<CompanyPersistencePort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCompaniesSuscribedSinceUC,
        {
          provide: COMPANY_PERSISTENCE_PORT,
          useValue: {
            save: jest.fn(),
            findAdheredSince: jest.fn(
              async (_) =>
                await [new Company('12-345678-9', 'razon', new Date(), 'pyme')],
            ),
            findByCuit: jest.fn(),
          } as jest.Mocked<CompanyPersistencePort>,
        },
      ],
    }).compile();

    service = module.get<GetCompaniesSuscribedSinceUC>(
      GetCompaniesSuscribedSinceUC,
    );
    mockCompanyRepository = module.get(COMPANY_PERSISTENCE_PORT);
  });

  it('should get companies suscribed recently', async () => {
    const arr = await service.execute(new Date());
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toHaveLength(1);
    expect(arr[0]).toBeInstanceOf(Company);
  });
});
