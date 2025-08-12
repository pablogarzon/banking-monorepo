import { Transfer } from '../entities/transfer';

export const TRANSFER_PERSISTENCE_PORT = Symbol('TRANSFER_PERSISTENCE_PORT');

export interface TransferPersistencePort {
  save(transfer: Transfer): Promise<void>;
  findTransfersSince(date: Date): Promise<Transfer[]>;
}
