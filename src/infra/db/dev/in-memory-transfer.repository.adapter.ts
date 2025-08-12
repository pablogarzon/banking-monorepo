import { Injectable } from "@nestjs/common";
import { Transfer } from "src/domain/entities/transfer";
import { TransferRepository } from "src/domain/ports/transfer.repository";

@Injectable()
export class InMemoryTransferRepositoryAdapter implements TransferRepository {
    save(transfer: Transfer): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findTransfersSince(date: Date): Promise<Transfer[]> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Transfer[]> {
        throw new Error("Method not implemented.");
    }
}