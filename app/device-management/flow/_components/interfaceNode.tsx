"use client"
import { trpc } from "@/app/_trpc/client";
import { Node } from "reactflow";

export function interfaceNode() {
  const { status, data } =
    trpc.deviceManagement.interfaces.select.all.useQuery();

  const initialNodes: Node[] =
    data?.map((data, index) => {
      return {
        id: data.device?.id ?? "f",
        type: "textUpdater",
        data: {
          name: data.device?.name,
        },
        position: {
          x: 0,
          y: index * 100,
        },
      };
    }) ?? [];

  return initialNodes;
}
