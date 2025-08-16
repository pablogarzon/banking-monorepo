import { Company } from '../entities/company';

export const COMPANY_PERSISTENCE_PORT = Symbol('COMPANY_PERSISTENCE_PORT');

export interface CompanyPersistencePort {
  save(company: Company): Promise<void>;
  findByCuit(cuit: string): Promise<Company | null>;
  findAdheredSince(date: Date): Promise<Company[]>;
}
