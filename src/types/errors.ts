import { z } from 'zod';
const parseErrorSchema = z.object({
  errors: z
    .object({
      code: z.string(),
      minimum: z.number(),
      type: z.string(),
      inclusive: z.boolean(),
      exact: z.boolean(),
      message: z.string(),
      path: z.string().array(),
    })
    .array(),
});
export type ParseErrorType = z.infer<typeof parseErrorSchema>;
export const ERROR_MESSAGE_DATABASE = 'internal error in database';

export const ERROR_EMAIL_FORMAT = 'invalid format email';

///address
export const ERROR_ADDRESS_FORMAT = 'invalid format address';
export const ERROR_STATE_FORMAT = 'invalid format state';
export const ERROR_MESSAGE_DB_ADDRESS = 'internal error in address database';

const postalCodeErrorSchema = z.object({
  message: z.string(),
  type: z.string(),
  error: z
    .object({
      message: z.string(),
    })
    .array(),
});

export type PostalCodeError = z.infer<typeof postalCodeErrorSchema>;
