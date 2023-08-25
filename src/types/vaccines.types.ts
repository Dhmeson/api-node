import { z } from 'zod';

export const vaccineSchema = z.object({
  name: z.string(),
  durationMonths: z.number(), // Duração da vacina em meses
  dateAdministered: z.date(), // Data em que a vacina foi tomada
  petId: z.number(),
});
export type VaccineInput = z.infer<typeof vaccineSchema>;
