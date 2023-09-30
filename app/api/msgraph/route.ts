import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });

  const result = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: { Authorization: `Bearer ${token?.access_token}` },
  });

  const data = await result.json();

  return NextResponse.json(data);
}

export { handler as GET };
