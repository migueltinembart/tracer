import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Index } from "./pages";
import { Dashboard } from "./pages/home/dashbaord";
import { entityRoutes } from "@/pages/Entities/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      entityRoutes,
    ],
  },
]);

function App() {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5173/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
