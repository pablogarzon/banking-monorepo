import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { Company } from 'src/domain/entities/company';
import { CompanyPersistencePort } from 'src/domain/ports/company-persistence.port';

@Injectable()
export class InMemoryCompanyRepositoryAdapter
  implements CompanyPersistencePort
{
  async save(company: Company): Promise<void> {
    console.log('done saving');
  }
  findByCuit(cuit: string): Promise<Company | null> {
    throw new Error('Method not implemented.');
  }
  async findAdheredSince(date: Date): Promise<Company[]> {
    return [new Company('1234567', 'prueba', new Date(), 'pyme')];
  }
}
