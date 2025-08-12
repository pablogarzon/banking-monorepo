import { Transfer } from '../entities/transfer';

export const TRANSFER_REPOSITORY = Symbol('TRANSFER_REPOSITORY');

export interface TransferRepository {
  save(transfer: Transfer): Promise<void>;
  findTransfersSince(date: Date): Promise<Transfer[]>;
  findAll(): Promise<Transfer[]>;
}