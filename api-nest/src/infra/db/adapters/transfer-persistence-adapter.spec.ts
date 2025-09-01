import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TransferPersistenceAdapter } from './transfer-persistence.adapter';
import { TransferEntity } from '../entities/transfer.entity';
import { Transfer } from '@banking-monorepo/core';

describe('TransferPersitenceAdapter', () => {
  let adapter: TransferPersistenceAdapter;
  let repo: jest.Mocked<Repository<TransferEntity>>;

  const testCuit = '20-12345678-9';

  beforeEach(async () => {
    const repoMock: Partial<jest.Mocked<Repository<TransferEntity>>> = {
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferPersistenceAdapter,
        {
          provide: getRepositoryToken(TransferEntity),
          useValue: repoMock,
        },
      ],
    }).compile();

    adapter = module.get(TransferPersistenceAdapter);
    repo = module.get(getRepositoryToken(TransferEntity));
  });

  it('should save a transfer', async () => {
    const transfer = new Transfer(
      1,
      1000,
      testCuit,
      '1111',
      '2222',
      new Date(),
    );

    await adapter.save(transfer);

    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: transfer.id,
        importe: transfer.importe,
        empresaCuit: transfer.empresaCuit,
      }),
    );
  });

  it('should return transfers since a given date', async () => {
    const date = new Date();
    const transfer = [
      {
        id: 1,
        importe: 1000,
        empresaCuit: testCuit,
        cuentaDebito: '1',
        cuentaCredito: '2',
        fecha: date,
      },
    ] as TransferEntity[];

    const getMany = jest.fn().mockResolvedValue(transfer);
    const where = jest.fn().mockReturnValue({ getMany });
    const qb: any = { where };
    (repo.createQueryBuilder as jest.Mock).mockReturnValue(qb);

    const result = await adapter.findTransfersSince(date);

    expect(repo.createQueryBuilder).toHaveBeenCalledWith('t');
    expect(where).toHaveBeenCalledWith('t.fecha >= :date', {
      date: date.toISOString(),
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Transfer);
    expect(result[0].empresaCuit).toBe(testCuit);
  });
});
