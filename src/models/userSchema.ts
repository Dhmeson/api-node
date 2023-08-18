import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, { message: 'no empty name' }),
  email: z.string().email({ message: 'email is required' }),
});
