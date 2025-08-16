import { IsNotEmpty, IsIn } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  @IsNotEmpty()
  cuit!: string;

  @ApiProperty()
  @IsNotEmpty()
  razonSocial!: string;

  @ApiProperty({
    enum: ['pyme', 'corporativa'],
    description: 'Tipo de empresa',
  })
  @IsIn(['pyme', 'corporativa'], {
    message: 'El tipo debe ser "pyme" o "corporativa"',
  })
  tipo!: 'pyme' | 'corporativa';
}
