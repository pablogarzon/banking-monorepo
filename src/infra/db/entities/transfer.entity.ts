import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transfers')
export class TransferEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('numeric')
  importe!: number;

  @Column()
  empresaCuit!: string;

  @Column()
  cuentaDebito!: string;

  @Column()
  cuentaCredito!: string;

  @Column()
  fecha!: Date;
}
