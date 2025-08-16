import { z } from 'zod';

export const CreateCompanySchema = z.object({
  cuit: z.string().min(1, { message: 'CUIT es obligatorio' }),
  razonSocial: z.string().min(1, { message: 'Razón social es obligatoria' }),
  tipo: z.enum(['pyme', 'corporativa'], {
    error: 'El tipo debe ser "pyme" o "corporativa"',
  }),
});
