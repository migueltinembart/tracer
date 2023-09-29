import NextAuth, { AuthOptions } from "next-auth";
import AzureADProvider, { AzureADProfile } from "next-auth/providers/azure-ad";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "@/server/config/env";
import { db } from "@/server/db";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    AzureADProvider({
      clientId: env.AZURE_AD_CLIENT_ID,
      clientSecret: env.AZURE_AD_CLIENT_SECRET,
      tenantId: env.AZURE_AD_TENANT_ID,

      authorization: {
        params: {
          scope: "openid profile email offline_access User.Read",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          id: token.sub,
        },
      };
    },
    async jwt({ token, user, account, session }) {
      return token;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
