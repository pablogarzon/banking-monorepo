import { Injectable } from '@nestjs/common';
import { Company, CompanyPersistencePort } from '@banking-monorepo/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';

@Injectable()
export class CompanyPersistenceAdapter implements CompanyPersistencePort {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepo: Repository<CompanyEntity>,
  ) {}

  async save(company: Company): Promise<void> {
    const companyEntity = Object.assign(new CompanyEntity(), company);
    await this.companyRepo.save(companyEntity);
  }

  async findByCuit(cuit: string): Promise<Company | null> {
    const e = await this.companyRepo.findOneBy({ cuit: cuit });
    if (!e) return null;
    return new Company(e.cuit, e.razonSocial, e.fechaAdhesion, e.tipo as any);
  }

  async findAdheredSince(date: Date): Promise<Company[]> {
    const rows = await this.companyRepo
      .createQueryBuilder('c')
      .where('c.fechaAdhesion >= :date', { date: date.toISOString() })
      .getMany();
    return rows.map(
      (r) => new Company(r.cuit, r.razonSocial, r.fechaAdhesion, r.tipo as any),
    );
  }
}
