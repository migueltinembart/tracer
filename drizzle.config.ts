import type { Config } from "drizzle-kit";
import { env } from "./server/config/env";

export default {
  out: "./server/migrations",
  schema: "./server/db/*.ts",
  breakpoints: false,
  driver: "pg",
  dbCredentials: {
    connectionString: env.CONNECTION_STRING.concat("?sslmode=require"),
  },
} satisfies Config;
