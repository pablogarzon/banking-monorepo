import { Company } from '../entities/company';

export const COMPANY_REPOSITORY = Symbol('COMPANY_REPOSITORY');

export interface CompanyRepository {
  save(company: Company): Promise<void>;
  findByCuit(cuit: string): Promise<Company | null>;
  findAdheredSince(date: Date): Promise<Company[]>;
}