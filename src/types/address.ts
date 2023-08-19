import { z } from 'zod';

export const postalCodeValidator = z.string().regex(/^\d{5}-\d{3}$/);
export enum States {
  AC = 'Acre',
  AL = 'Alagoas',
  AP = 'Amapá',
  AM = 'Amazonas',
  BA = 'Bahia',
  CE = 'Ceará',
  DF = 'Distrito Federal',
  ES = 'Espírito Santo',
  GO = 'Goiás',
  MA = 'Maranhão',
  MT = 'Mato Grosso',
  MS = 'Mato Grosso do Sul',
  MG = 'Minas Gerais',
  PA = 'Pará',
  PB = 'Paraíba',
  PR = 'Paraná',
  PE = 'Pernambuco',
  PI = 'Piauí',
  RJ = 'Rio de Janeiro',
  RN = 'Rio Grande do Norte',
  RS = 'Rio Grande do Sul',
  RO = 'Rondônia',
  RR = 'Roraima',
  SC = 'Santa Catarina',
  SP = 'São Paulo',
  SE = 'Sergipe',
  TO = 'Tocantins',
}
export const addressSchema = z.object({
  city: z.string(),
  postalCode: z.string(),
  state: z.string(),
  street: z.string(),
});

export const addressUpdateSchema = z.object({
  city: z.string().optional(),
  postalCode: z.string().optional(),
  state: z.string().optional(),
  street: z.string().optional(),
});
const addressOutputSchema = addressSchema.extend({ id: z.number() });
export type AddressInput = z.infer<typeof addressSchema>;
export type AddressOutput = z.infer<typeof addressOutputSchema>;
export type AddressInterface = z.infer<typeof addressSchema>;

export type AddressUpdateInput = z.infer<typeof addressUpdateSchema>;
