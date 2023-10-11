import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const cardClasses = clsx(["overflow-hidden"]);

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="flex flex-col flex-1 p-6 border  lg:shadow-sm rounded-xl max-md:border-hidden">
        <div className="text-xl p-3 pb-8">
          <p>Welcome, </p>
          <p className="text-3xl font-bold">{session?.user.name}</p>
        </div>

        <div className="grid min-h-min gap-6 flex-1 grid-cols-6 grid-rows-4">
          <Card
            className={clsx(cardClasses, ["col-span-4 row-start-1 row-span-1"])}
          >
            <CardHeader className="pb-2 border-b bg-gray-50">
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Jump right in to your last projects
              </CardDescription>
            </CardHeader>

            <CardContent className="grid items-stretch flex-1 grid-cols-6 grid-rows-1 gap-3 pt-6"></CardContent>
          </Card>

          <Card
            className={clsx(cardClasses, ["row-start-2 col-span-4 row-span-3"])}
          >
            <CardHeader className="pb-2 border-b bg-gray-50">
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                All your favorite menu items in one place
              </CardDescription>
            </CardHeader>

            <CardContent className="grid items-stretch flex-1 grid-cols-6 grid-rows-1 gap-3 pt-6"></CardContent>
          </Card>
          <Card
            className={clsx(cardClasses, [
              "col-span-2 row-span-full col-start-5",
            ])}
          >
            <CardHeader className="pb-2 border-b bg-gray-50">
              <CardTitle>News Feed</CardTitle>
              <CardDescription>
                See what others have done in your organization
              </CardDescription>
            </CardHeader>

            <CardContent className="grid items-stretch flex-1 grid-cols-6 grid-rows-1 gap-3 pt-6"></CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
