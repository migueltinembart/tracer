"use client";
import { getServerSession } from "next-auth";
import { trpc } from "./_trpc/client";
import { getSession, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Home() {
  const self = trpc.authorized.getInfo.useQuery();
  console.log(self.data);
}
