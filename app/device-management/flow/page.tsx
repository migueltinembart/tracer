"use client";

import Flow from "./_components/reactFlow";
import { interfaceNode} from "./_components/interfaceNode";



export default function Pagina() {
  return (
    <div className="w-[90vw] h-[90vh]">
      <Flow initialNodes={interfaceNode()} initialEdges={[]} />
    </div>
  );
}
