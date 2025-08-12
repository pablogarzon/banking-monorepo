export class Company {
  constructor(
    public cuit: string,
    public razonSocial: string,
    public fechaAdhesion: Date,
    public tipo?: 'pyme' | 'corporativa',
  ) {}
}