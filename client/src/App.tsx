import { SiteCreatorCard } from "./components/layout/dashboardItems.tsx/SIteCreatorCard";
import { NavBar } from "./components/layout/navbar";


function App() {
  return (
    <body className="h-screen w-screen">
      <div className="w-full h-full flex flex-col pb-6">
        <NavBar className="h-12 border-b-[2px] border-gray-300 shadow-md flex items-center gap-8 py-2 mb-6 px-28"></NavBar>
        <div className="w-full h-full px-28">
          <div className="border border-gray-300 rounded-sm grid h-full p-6 grid-cols-5 grid-rows-5 gap-6 grid-flow-col">
            <SiteCreatorCard></SiteCreatorCard>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
