"use client";
import { getServerSession } from "next-auth";
import { trpc } from "./_trpc/client";
import { useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Home() {
  const result = trpc.auth.getSession.useQuery();

  return <div></div>;
}
