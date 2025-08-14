import { Test, TestingModule } from '@nestjs/testing';
import { GetCompaniesWithTransferSinceUC } from './get-companies-with-transfer-since.uc';
import {
  COMPANY_PERSISTENCE_PORT,
  CompanyPersistencePort,
} from 'src/domain/ports/company-persistence.port';
import {
  TRANSFER_PERSISTENCE_PORT,
  TransferPersistencePort,
} from 'src/domain/ports/transfer-persistence.port';
import { Transfer } from 'src/domain/entities/transfer';
import { Company } from 'src/domain/entities/company';

describe('GetCompaniesWithTransferSinceUC', () => {
  let service: GetCompaniesWithTransferSinceUC;

  let mockCompanyRepository: jest.Mocked<CompanyPersistencePort>;

  let mockTransferRepository: jest.Mocked<TransferPersistencePort>;

  const testCuit = '98-765432-1';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCompaniesWithTransferSinceUC,
        {
          provide: COMPANY_PERSISTENCE_PORT,
          useValue: {
            save: jest.fn(),
            findAdheredSince: jest.fn(),
            findByCuit: jest.fn(
              async (cuit) =>
                await new Company(cuit, 'razon', new Date(), 'pyme'),
            ),
          } as jest.Mocked<CompanyPersistencePort>,
        },
        {
          provide: TRANSFER_PERSISTENCE_PORT,
          useValue: {
            save: jest.fn(),
            findTransfersSince: jest.fn(
              async (_) =>
                await [
                  new Transfer(
                    1,
                    100.0,
                    testCuit,
                    '12345',
                    '67890',
                    new Date(),
                  ),
                ],
            ),
          } as jest.Mocked<TransferPersistencePort>,
        },
      ],
    }).compile();

    service = module.get<GetCompaniesWithTransferSinceUC>(
      GetCompaniesWithTransferSinceUC,
    );
    mockCompanyRepository = module.get(COMPANY_PERSISTENCE_PORT);
    mockTransferRepository = module.get(TRANSFER_PERSISTENCE_PORT);
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
