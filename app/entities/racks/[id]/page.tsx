"use client";
import { trpc } from "@/app/_trpc/client";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { UpdateIcon } from "@radix-ui/react-icons";

export default function Rack() {
  const { id: paramId } = useParams();

  const { data, isLoading, isSuccess, isError } =
    trpc.entities.sites.select.one.useQuery(Number(paramId));

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <UpdateIcon height={30} width={30}></UpdateIcon>
      </div>
    );
  }

  if (isError) {
    return <span>Something went wrong here</span>;
  }

  return (
    <div
      className={clsx([
        "flex",
        "flex-1",
        "flex-col",
        "border",
        "rounded-lg",
        "p-6",
      ])}
    >
      <div className="pb-4">
        <h1 className="text-xl font-semibold">{data.name}</h1>
        <span className="text-xs text-gray-600">{`Created ${moment(
          data.created_at
        ).format("DD.MM.YYYY hh:mm")} | updated ${moment(
          data.updated_at
        ).format("DD.MM.YYYY hh:mm")}`}</span>
      </div>
      <div className="grid lg:grid-cols-[1fr_.8fr] md:grid-cols-[1fr_.8fr] flex-1 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Rack</CardTitle>
            <CardDescription>See whats going on in this site</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Name</TableCell>
                  <TableCell>{data.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Description</TableCell>
                  <TableCell>{data.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rack Group</TableCell>
                  <TableCell>{data.site_group?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tenant</TableCell>
                  <TableCell>{data.tenant?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Status</TableCell>
                  <TableCell>
                    <Badge>{data.status}</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Created by</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          //@ts-ignore
                          src={data.created_by.image}
                          //@ts-ignore
                          alt={data.created_by.name}
                        ></AvatarImage>
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">
                        {data.created_by?.name}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Related</CardTitle>
            <CardDescription>Quick Access for {data.name}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
