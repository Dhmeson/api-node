import { z } from 'zod';

export const validInpuId = z.number().min(1);
