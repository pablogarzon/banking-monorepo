export interface CreateCompanyCommand {
    cuit: string;
    razonSocial: string;
    fechaAdhesion: Date;
    tipo: 'pyme' | 'corporativa';
  }