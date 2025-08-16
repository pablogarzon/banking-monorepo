import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('companies')
export class CompanyEntity {
  @PrimaryColumn()
  cuit!: string;

  @Column()
  razonSocial!: string;

  @Column()
  fechaAdhesion!: Date;

  @Column({ nullable: true })
  tipo?: string;
}
