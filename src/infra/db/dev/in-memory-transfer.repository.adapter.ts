import { Injectable } from '@nestjs/common';
import { Transfer } from 'src/domain/entities/transfer';
import { TransferPersistencePort } from 'src/domain/ports/transfer-persistence.port';

@Injectable()
export class InMemoryTransferRepositoryAdapter
  implements TransferPersistencePort
{
  save(transfer: Transfer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findTransfersSince(date: Date): Promise<Transfer[]> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Transfer[]> {
    throw new Error('Method not implemented.');
  }
}
