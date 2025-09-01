import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferPersistencePort } from '@banking-monorepo/core';
import { TransferEntity } from '../entities/transfer.entity';
import { Repository } from 'typeorm';
import { Transfer } from '@banking-monorepo/core';

@Injectable()
export class TransferPersistenceAdapter implements TransferPersistencePort {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly transferRepo: Repository<TransferEntity>,
  ) {}

  async save(transfer: Transfer): Promise<void> {
    const transferEntity = Object.assign(new TransferEntity(), transfer);
    await this.transferRepo.save(transferEntity);
  }

  async findTransfersSince(date: Date): Promise<Transfer[]> {
    const rows = await this.transferRepo
      .createQueryBuilder('t')
      .where('t.fecha >= :date', { date: date.toISOString() })
      .getMany();
    return rows.map(
      (r) =>
        new Transfer(
          r.id,
          Number(r.importe),
          r.empresaCuit,
          r.cuentaDebito,
          r.cuentaCredito,
          r.fecha,
        ),
    );
  }
}
