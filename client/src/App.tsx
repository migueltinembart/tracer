import { SiteCreatorCard, TenantCreatorCard } from "@/components/layout/dashboardItems";
import { NavBar } from "./components/layout/navbar";

function App() {
  return (
    <body className="h-screen w-screen">
      <div className="w-full h-full flex flex-col pb-6">
        <NavBar className="h-12 border-b-[2px] border-gray-300 shadow-md flex items-center gap-8 py-2 mb-6 px-28"></NavBar>
        <div className="w-full h-full px-28">
          <div className="border border-gray-300 rounded-sm grid h-full p-6 lg:grid-cols-6 grid-rows-5 md:grid-cols-4 gap-6 grid-flow-row">
            <SiteCreatorCard></SiteCreatorCard>
            <TenantCreatorCard className="row-start-3"></TenantCreatorCard>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
