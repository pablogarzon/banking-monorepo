export class Transfer {
  constructor(
    public id: number,
    public importe: number,
    public empresaCuit: string,
    public cuentaDebito: string,
    public cuentaCredito: string,
    public fecha: Date,
  ) {}
}
