import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AzureADProfile } from "next-auth/providers/azure-ad";

declare module "next-auth" {
  interface Session {
    user: { id: JWT["sub"] } & DefaultSession["user"];
    expires: DefaultSession["expires"];
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name: string;
    email: strng;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    access_token?: string;
    refresh_token?: string;
    expires_in: number;
  }
}

// declare module "next-auth/jwt" {}
