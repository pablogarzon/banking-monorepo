import { IsNotEmpty, IsIn, IsISO8601 } from '@nestjs/class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  cuit!: string;

  @IsNotEmpty()
  razonSocial!: string;

  @IsISO8601()
  fechaAdhesion!: string; // ISO date

  @IsIn(['pyme', 'corporativa'])
  tipo!: 'pyme' | 'corporativa';
}