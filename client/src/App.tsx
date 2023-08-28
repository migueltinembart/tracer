import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Outlet } from "react-router-dom";

interface Sites {
  id: number;
  name: string;
  updatedAt: string;
}

function App() {
  const [list, setList] = useState<Sites[]>([]);

  useEffect(() => {
    fetch("/api/sites")
      .then((promise) => promise.json())
      .then(setList);
  }, []);

  return (
    <>
      <div>
        {list.map((sites) => (
          <div key={sites.id}>{sites.name}, {sites.updatedAt}</div>
        ))}
      </div>
    </>
  );
}

export default App;
