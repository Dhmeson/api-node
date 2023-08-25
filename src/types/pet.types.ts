import { z } from 'zod';

export const petSchema = z
  .object({
    name: z.string(),
    specie: z.string().optional().default(''),
    age: z.number().optional().default(0), //calcular idade
    birthDate: z.date(), //  birthDate: "2010-01-15",
    weight: z.number(),
    height: z.number(),
    allergies: z.string().optional().default(''),
    ownerId: z.number(),
  })
  .refine((data) => {
    if (data.birthDate && !data.age) {
      const today = new Date();
      const birthDate = new Date(data.birthDate);
      const ageInMilliseconds = today.getTime() - birthDate.getTime();
      const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
      return { ...data, age: ageInYears };
    }
    return data; // No changes needed
  }, 'ageCalculator');
export const petUpdateSchema = z
  .object({
    name: z.string().optional(),
    specie: z.string().optional(),
    age: z.number().optional(),
    birthDate: z.date().optional(),
    weight: z.number().optional(),
    height: z.number().optional(),
    allergies: z.string().optional(),
  })
  .refine((data) => {
    if (data.birthDate && !data.age) {
      const today = new Date();
      const birthDate = new Date(data.birthDate);
      const ageInMilliseconds = today.getTime() - birthDate.getTime();
      const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
      return { ...data, age: ageInYears };
    }
    return data; // No changes needed
  }, 'ageCalculator');
const petUpdateSchma = z.object({
  id: z.number(),
  name: z.string(),
  specie: z.string().optional().nullable(),
  age: z.number(),
  birthDate: z.date(),
  weight: z.number(),
  height: z.number(),
  allergies: z.string().optional().nullable(),
});
export type PetInput = z.infer<typeof petSchema>;
export type PetUpdateInput = z.infer<typeof petUpdateSchema>;
export type PetOutput = z.infer<typeof petUpdateSchma>;
