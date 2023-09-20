import {
  char,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

const accounts = pgTable(
  "accounts",
  {
    id: char("id", { length: 32 }),
    userId: text("user_id"),
    type: text("type"),
    provider: text("provider"),
    providerAccountId: text("provider_account_id"),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
    oAuthTokenSecret: text("oauth_token_secret"),
    oauthToken: text("oauth_token"),
  },
  (accounts) => {
    return { cpk: primaryKey(accounts.id) };
  }
);

const sessions = pgTable("sessions", {
  id: char("id", { length: 32 }),
  sessionToken: text("session_token").unique(),
  userId: text("user_id"),
  expires: timestamp("expires"),
});

const users = pgTable("users", {
  id: char("id", { length: 32 }),
  name: text("name"),
  email: text("email"),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
});

const verificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier"),
  token: text("token"),
  expires: timestamp("expires"),
});
