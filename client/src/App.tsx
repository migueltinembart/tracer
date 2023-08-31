import {
  SiteCreatorCard,
  TenantCreatorCard,
} from "@client/src/components/layout/dashboardItems";
import { NavBar } from "./components/layout/navbar/navbar";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@server/utils/trpc/routers";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://0.0.0.0:5000",
    }),
  ],
});

function App() {
  return (
    <body className="h-screen w-screen">
      <div className="w-full h-full flex flex-col pb-6">
        <NavBar className="h-12  flex items-center gap-8 py-2  lg:px-28 max-lg:px-6"></NavBar>
        <div className="w-full h-full lg:px-28 max-lg:px-6">
          <div className="border max-md:border-hidden max-md:px-0 border-gray-300 rounded-lg grid h-full p-6 lg:grid-cols-6 grid-rows-5 md:grid-cols-4 gap-6 grid-flow-row">
            <SiteCreatorCard></SiteCreatorCard>
            <TenantCreatorCard className="row-start-3"></TenantCreatorCard>
            <div>{}</div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
