"use client";
import { trpc } from "../_trpc/client";

export default function Test() {
  const result = trpc.tenants.select.all.useQuery();

  return <div>{result?.data?.at(122)?.name}</div>;
}
