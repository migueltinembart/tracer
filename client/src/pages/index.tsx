import { NavBar } from "@/components/layout/navbar/navbar";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { Dialog } from "@radix-ui/react-dialog";
import { Outlet } from "react-router-dom";

export function Index() {
  return (
    <main className="max-md:h-full h-screen w-screen bg-white flex flex-col">
      <div className="flex flex-1 flex-col pb-6">
        <NavBar className="h-12  flex items-center gap-8 py-2  lg:px-28 max-lg:px-6"></NavBar>
        <div className="w-full flex flex-col flex-1 lg:px-28 max-lg:px-6">
          <AlertDialog>
            
              <div className="border max-md:border-hidden border-gray-300 rounded-lg h-full p-6 ">
                <Outlet></Outlet>
              </div>
            
          </AlertDialog>
        </div>
      </div>
      <Toaster></Toaster>
    </main>
  );
}
