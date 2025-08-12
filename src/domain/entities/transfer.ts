export class Transfer {
  constructor(
    public id: string,
    public importe: number,
    public empresaCuit: string,
    public cuentaDebito: string,
    public cuentaCredito: string,
    public fecha: Date,
  ) {}
}