import { Company } from '../entities/company';

export interface CompanyPersistencePort {
  save(company: Company): Promise<void>;
  findByCuit(cuit: string): Promise<Company | null>;
  findAdheredSince(date: Date): Promise<Company[]>;
}
