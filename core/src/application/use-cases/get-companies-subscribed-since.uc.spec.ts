import {
  CompanyPersistencePort,
} from '../../domain/ports/company-persistence.port';
import { Company } from '../../domain/entities/company';
import { GetCompaniesSuscribedSinceUC } from './get-companies-subscribed-since.uc';

describe('GetCompaniesSuscribedSinceUC', () => {
  let service: GetCompaniesSuscribedSinceUC;

  let mockCompanyRepository: jest.Mocked<CompanyPersistencePort>;

  beforeEach(async () => {
    mockCompanyRepository = {
      save: jest.fn(),
      findAdheredSince: jest.fn(
        async (_) =>
          await [new Company('12-345678-9', 'razon', new Date(), 'pyme')],
      ),
      findByCuit: jest.fn(),
    };
    service = new GetCompaniesSuscribedSinceUC(mockCompanyRepository);
  });

  it('should get companies suscribed recently', async () => {
    const arr = await service.execute(new Date());
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toHaveLength(1);
    expect(arr[0]).toBeInstanceOf(Company);
  });
});
