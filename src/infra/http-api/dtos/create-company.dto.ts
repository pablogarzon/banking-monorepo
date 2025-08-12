import { IsNotEmpty, IsIn } from '@nestjs/class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  cuit!: string;

  @IsNotEmpty()
  razonSocial!: string;

  @IsIn(['pyme', 'corporativa'])
  tipo!: 'pyme' | 'corporativa';
}

