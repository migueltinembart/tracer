import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AzureADProfile } from "next-auth/providers/azure-ad";

declare module "next-auth" {
  interface Session {
    user: { id: JWT["sub"] } & DefaultSession["user"];
    expires: DefaultSession["expires"];
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
    accessToken: string | undefined;
  }
}

// declare module "next-auth/jwt" {}
