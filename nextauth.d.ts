import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AzureADProfile } from "next-auth/providers/azure-ad";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
    } & DefaultSession["user"];
    expires: DefaultSession["expires"];

  }
}

// declare module "next-auth/jwt" {}
