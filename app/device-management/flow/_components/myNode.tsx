"use client";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const handleStyle = { left: 10 };

export default function TextUpdaterNode<T>({ data }: { data: T }) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle
        type="target"
        className="border w-2 h-2 bg-black"
        position={Position.Top}
      />
      <div className="border rounded-md border-black p-2 bg-white h-60 w-60">
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        className="border w-2 h-2 bg-black"
        position={Position.Bottom}
        id="a"
      />
      <Handle
        type="source"
        className="border w-2 h-2 bg-black"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}
