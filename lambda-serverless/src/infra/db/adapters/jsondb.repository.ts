import { Company, CompanyPersistencePort } from '@banking-monorepo/core';
import { jsondbClient } from '../clients/jsondb.client';

export class JsondbRepository implements CompanyPersistencePort {
  async save(company: Company): Promise<void> {
    await jsondbClient.push('/company[]', company, true);
  }
  findByCuit(cuit: string): Promise<Company | null> {
    throw new Error('Method not implemented.');
  }
  findAdheredSince(date: Date): Promise<Company[]> {
    throw new Error('Method not implemented.');
  }
}
