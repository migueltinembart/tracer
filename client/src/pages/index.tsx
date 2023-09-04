import { NavBar } from "@/components/layout/navbar/navbar";
import { Dashboard } from "./home/dashbaord";
import { Toaster } from "@/components/ui/toaster";

export function Index() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      <div className="flex flex-1 flex-col pb-6">
        <NavBar className="h-12  flex items-center gap-8 py-2  lg:px-28 max-lg:px-6"></NavBar>
        <div className="w-full flex flex-col flex-1 lg:px-28 max-lg:px-6">
          <div className="border max-md:border-hidden max-md:px-0 border-gray-300 rounded-lg grid h-full p-6 lg:grid-cols-6 grid-rows-5 md:grid-cols-4 gap-6 grid-flow-col-dense">
            <Dashboard></Dashboard>
          </div>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
}
