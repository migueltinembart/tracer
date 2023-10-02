import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  CONNECTION_STRING: z.string().nonempty(),
  MIGRATION_FOLDER: z.string(),
  NEXTAUTH_SECRET: z.string(),
  AZURE_AD_CLIENT_ID: z.string(),
  AZURE_AD_CLIENT_SECRET: z.string(),
  AZURE_AD_TENANT_ID: z.string(),
});

export const env = envSchema.parse(process.env);
