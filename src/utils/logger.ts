import pino from 'pino';
import { env } from 'config/env';

export const logger = pino({
  transport: { target: 'pino-pretty' },
  level: env.LOG_LEVEL,
  redact: ['CONNECTION_STRING'],
});
