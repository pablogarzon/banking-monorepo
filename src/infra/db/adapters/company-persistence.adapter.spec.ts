import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyPersistenceAdapter } from './company-persistence.adapter';
import { CompanyEntity } from '../entities/company.entity';
import { Company } from 'src/domain/entities/company';

describe('CompanyPersistenceAdapter', () => {
  let adapter: CompanyPersistenceAdapter;
  let companyRepo: jest.Mocked<Repository<CompanyEntity>>;

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<CompanyEntity>>> = {
      save: jest.fn(),
      findOneBy: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyPersistenceAdapter,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: repoMock,
        },
      ],
    }).compile();

    adapter = module.get(CompanyPersistenceAdapter);
    companyRepo = module.get(getRepositoryToken(CompanyEntity));
  });

  it('should save a company', async () => {
    const company = new Company('12-345678-9', 'razon', new Date(), 'pyme');

    await adapter.save(company);

    expect(companyRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        cuit: company.cuit,
        razonSocial: company.razonSocial,
        tipo: company.tipo,
      }),
    );
  });

  it('should return a Company when found by cuit', async () => {
    const entity = {
      cuit: '12-345678-9',
      razonSocial: 'razon',
      fechaAdhesion: new Date(),
      tipo: 'pyme',
    } as CompanyEntity;
    companyRepo.findOneBy.mockResolvedValue(entity);

    const result = await adapter.findByCuit(entity.cuit);

    expect(result).toBeInstanceOf(Company);
    expect(result?.cuit).toBe(entity.cuit);
  });

  it('should return null when company not found by cuit', async () => {
    companyRepo.findOneBy.mockResolvedValue(null);
    const result = await adapter.findByCuit('12-345678-9');
    expect(result).toBeNull();
  });

  it('should return recently adhered companies', async () => {
    const since = new Date();
    const companies = [
      {
        cuit: '12-345678-9',
        razonSocial: 'razon',
        fechaAdhesion: since,
        tipo: 'pyme',
      },
    ] as CompanyEntity[];

    const getMany = jest.fn().mockResolvedValue(companies);
    const where = jest.fn().mockReturnValue({ getMany });
    const qb: any = { where };
    (companyRepo.createQueryBuilder as jest.Mock).mockReturnValue(qb);

    const result = await adapter.findAdheredSince(since);

    expect(companyRepo.createQueryBuilder).toHaveBeenCalledWith('c');
    expect(where).toHaveBeenCalledWith('c.fechaAdhesion >= :date', {
      date: since.toISOString(),
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Company);
  });
});
