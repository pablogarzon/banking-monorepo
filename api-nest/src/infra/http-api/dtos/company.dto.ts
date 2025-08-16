import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
  @ApiProperty()
  cuit: string;

  @ApiProperty()
  razonSocial: string;

  @ApiProperty()
  fechaAdhesion: string; // ISO string

  @ApiProperty()
  tipo: 'pyme' | 'corporativa';
}
