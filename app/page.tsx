"use client";
import { getServerSession } from "next-auth";
import { trpc } from "./_trpc/client";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Home() {
  const result = trpc.auth.getSession.useSuspenseQuery();

  return <div>{result[0].user?.name}</div>;
}
