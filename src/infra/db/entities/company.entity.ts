import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('companies')
export class CompanyEntity {
  @PrimaryColumn()
  cuit!: string;

  @Column()
  razonSocial!: string;

  @Column({ type: 'datetime' })
  fechaAdhesion!: Date;

  @Column({ nullable: true })
  tipo?: string;
}
