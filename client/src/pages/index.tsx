import { NavBar } from "@/components/layout/navbar/navbar";
import { Dashboard } from "./home/dashbaord";
import { Toaster } from "@/components/ui/toaster";

export function Index() {
  return (
    <div className="max-md:h-full h-screen w-screen bg-white flex flex-col">
      <div className="flex flex-1 flex-col pb-6">
        <NavBar className="h-12  flex items-center gap-8 py-2  lg:px-28 max-lg:px-6"></NavBar>
        <div className="w-full flex flex-col flex-1 lg:px-28 max-lg:px-6">
          <Dashboard></Dashboard>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
}
