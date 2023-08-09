import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { env } from '../config/env';
import { logger } from './logger';

export function buildDB() {
  const client = new Pool({
    connectionString: env.CONNECTION_STRING,
    ssl: true,
  });

  // Run info log for logging purposes
  logger.info('Database client initialized');

  

  return drizzle(client);
}

export const db = buildDB();
