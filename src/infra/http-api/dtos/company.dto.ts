export class CompanyDto {
  cuit: string;
  razonSocial: string;
  fechaAdhesion: string; // ISO string
  tipo: 'pyme' | 'corporativa';
}
