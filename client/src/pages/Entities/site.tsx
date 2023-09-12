import { useParams } from "react-router-dom";

export function Site() {
  const params = useParams();

  return <div>{params.id}</div>;
}
