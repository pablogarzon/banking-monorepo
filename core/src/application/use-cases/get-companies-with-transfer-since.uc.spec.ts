import { GetCompaniesWithTransferSinceUC } from './get-companies-with-transfer-since.uc';
import { CompanyPersistencePort } from '../../domain/ports/company-persistence.port';
import { TransferPersistencePort } from '../../domain/ports/transfer-persistence.port';
import { Transfer } from '../../domain/entities/transfer';
import { Company } from '../../domain/entities/company';

describe('GetCompaniesWithTransferSinceUC', () => {
  let service: GetCompaniesWithTransferSinceUC;

  let mockCompanyRepository: jest.Mocked<CompanyPersistencePort>;

  let mockTransferRepository: jest.Mocked<TransferPersistencePort>;

  const testCuit = '98-765432-1';

  beforeEach(async () => {
    mockCompanyRepository = {
      save: jest.fn(),
      findAdheredSince: jest.fn(),
      findByCuit: jest.fn(
        async (cuit) => await new Company(cuit, 'razon', new Date(), 'pyme'),
      ),
    };
    mockTransferRepository = {
      save: jest.fn(),
      findTransfersSince: jest.fn(
        async (_) =>
          await [
            new Transfer(1, 100.0, testCuit, '12345', '67890', new Date()),
          ],
      ),
    };

    service = new GetCompaniesWithTransferSinceUC(
      mockCompanyRepository,
      mockTransferRepository,
    );
  });

  it('should get companies with transfers', async () => {
    const arr = await service.execute(new Date());
    expect(Array.isArray(arr)).toBe(true);
    expect(arr).toHaveLength(1);
    expect(arr[0]).toBeInstanceOf(Company);
    expect(mockTransferRepository.findTransfersSince).toHaveBeenCalled();
    expect(mockCompanyRepository.findByCuit).toHaveBeenCalled();
    expect(arr[0].cuit).toBe(testCuit);
  });
});
