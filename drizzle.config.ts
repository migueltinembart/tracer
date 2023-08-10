import type { Config } from 'drizzle-kit';
import { env } from './src/config/env';

export default {
  out: './migrations',
  schema: './src/schemas/test.ts',
  breakpoints: false,
  driver: 'pg',
  dbCredentials: {
    connectionString: env.CONNECTION_STRING,
  },
} satisfies Config;
