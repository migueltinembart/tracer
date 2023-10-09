"use client";
import { trpc } from "@/app/_trpc/client";
import { ConnectOpts } from "net";
import { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeTypes,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  ConnectingHandle,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";

export default function FlowView() {
  const [interfaces, interfacesQuery] = trpc.deviceManagement.interfaces.select.all.useSuspenseQuery();
  console.log(interfaces)
  console.log(interfacesQuery)
  const myNodes = interfacesQuery.data;

  const initNode = myNodes?.map((node, index) => {
    return {
      id: node.id,
      position: {
        x: 0,
        y: index * 100,
      },
      data: {
        label: `${node.device?.name}: ${node.name}`,
      },
    };
  });

  const initialNodes: Node[] = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
    { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
  ];
  const initialEdges: Edge[] = [];

  const [nodes, setNodes] = useState(initNode ?? []);
  
  const [edges, setEdges] = useState(initialEdges ?? []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
    <>
      <div className="overflow-hidden">
        <div
          id="Flow"
          style={{
            height: "90vh",
            width: "100vw",
          }}
        >
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </>
  );
}
