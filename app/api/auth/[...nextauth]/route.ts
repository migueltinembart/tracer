import NextAuth, { AuthOptions } from "next-auth";
import AzureADProvider, { AzureADProfile } from "next-auth/providers/azure-ad";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "@/server/config/env";
import { db } from "@/server/db";
import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";

interface RefreshAccessToken {
  token_type: string;
  scope: string;
  expires_in: number;
  ext_expires_in: number;
  access_token: string;
  refresh_token: string;
  id_token: string;
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const url =
      "https://login.microsoftonline.com/d9b95f80-f0ed-413b-a54d-5126536a96a9/oauth2/v2.0/token";
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        `grant_type=refresh_token` +
        `&client_secret=${env.AZURE_AD_CLIENT_SECRET}` +
        `&refresh_token=${token.refresh_token}` +
        `&client_id=${env.AZURE_AD_CLIENT_ID}`,
    });
    const res: RefreshAccessToken = await result.json();
    return {
      ...token,
      access_token: res.access_token,
      refresh_token: res.refresh_token,
      expires_in: Date.now() + res.expires_in * 1000,
    };
  } catch (err) {
    console.log(err);
    return token;
  }
}

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    AzureADProvider({
      clientId: env.AZURE_AD_CLIENT_ID,
      clientSecret: env.AZURE_AD_CLIENT_SECRET,
      tenantId: env.AZURE_AD_TENANT_ID,

      authorization: {
        params: {
          scope: "openid profile email offline_access",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account, session, profile }) {
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token ?? token.refresh_token;
        token.expires_in = account.expires_at ?? token.expires_in;
      }

      if (Date.now() < token.expires_in) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
