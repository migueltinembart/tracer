"use client";
import { trpc } from "./_trpc/client";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const { data } = trpc.test.useQuery();

  return <div>{}</div>;
}
