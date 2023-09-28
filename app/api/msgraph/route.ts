import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { db } from "@/server/db";
import { accounts } from "@/server/db/auth";
import { eq } from "drizzle-orm";

export async function GET(req: NextApiRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "unauthorized" });
  } else {
    const [dbRes] = await db
      .select({
        accessToken: accounts.access_token,
      })
      .from(accounts)
      .where(eq(accounts.userId, session?.user?.id!));

    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${dbRes.accessToken}` },
    });

    const data = await response.json();

    return NextResponse.json(data);
  }
}
