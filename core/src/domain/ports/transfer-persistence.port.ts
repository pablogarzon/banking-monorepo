import { Transfer } from '../entities/transfer';

export interface TransferPersistencePort {
  save(transfer: Transfer): Promise<void>;
  findTransfersSince(date: Date): Promise<Transfer[]>;
}
