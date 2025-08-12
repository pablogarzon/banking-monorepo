import { Injectable, MethodNotAllowedException } from "@nestjs/common";
import { Company } from "src/domain/entities/company";
import { CompanyRepository } from "src/domain/ports/company.repository";

@Injectable()
export class InMemoryCompanyRepositoryAdapter implements CompanyRepository {
    async save(company: Company): Promise<void> {
        console.log("done saving");
    }
    findByCuit(cuit: string): Promise<Company | null> {
        throw new Error("Method not implemented.");
    }
    async findAdheredSince(date: Date): Promise<Company[]> {
        return [new Company("23456", "prueba", new Date(), "pyme")]
    }
}