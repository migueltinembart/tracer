"use client";
import { trpc } from "../_trpc/client";

export default function Home() {
  const result = trpc.tenants.select.one.useQuery(1);
  return <div>{result.data?.name}</div>;
}
