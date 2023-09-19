import z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  CONNECTION_STRING: z.string().nonempty(),
  MIGRATION_FOLDER: z.string(),
});

export const env = envSchema.parse(process.env);
