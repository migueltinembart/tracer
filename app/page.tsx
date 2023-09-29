"use client";
import { getServerSession } from "next-auth";
import { trpc } from "./_trpc/client";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Home() {
  const { data } = trpc.authorized.getSession.useQuery();
  return <div>{data}</div>;
}
