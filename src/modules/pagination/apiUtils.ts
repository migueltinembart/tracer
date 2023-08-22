import { z } from 'zod';

export function createPaginationQueryStrings<S extends z.ZodRawShape>(schema: z.ZodObject<S>) {
  const enums = schema.keyof();
  return z
    .object({
      limit: z.coerce.number().optional(),
      offset: z.coerce.number().optional(),
      sort_by: enums.optional(),
      sort_order: z.enum(['asc', 'desc']).optional().default('asc'),
    })
    .describe('Allowed querystrings');
}
