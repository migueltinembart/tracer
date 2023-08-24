import z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  CONNECTION_STRING: z.string().nonempty(),
  PORT: z.string().transform(Number),
  HOST: z.string().default('0.0.0.0'),
  MIGRATION_FOLDER: z.string(),
  LOG_LEVEL: z.string().optional(),
  BASEURL: z.string(),
});

export const env = envSchema.parse(process.env);
