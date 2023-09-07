import { trpc } from "@/trpc";
import { SitesForm } from "./table";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutput } from "@/trpc";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";

export type SiteOutput = RouterOutput["sites"]["read"]["one"];

export const columns: ColumnDef<SiteOutput>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) => row.name,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("status")}</div>
    ),
  },
  {
    id: "SiteGroup",
    accessorKey: "siteGroup",
    header: () => <div>Site Group</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row?.original.siteGroup?.name}</div>
    ),
  },
  {
    id: "createdAt",
    accessorFn: (row) => row.createdAt,
    enableHiding: true,
    header: () => <div>Created at</div>,
    cell: ({ row }) => (
      <div>{moment(row.original.createdAt).format("DD.MM.YYYY")}</div>
    ),
  },
  {
    id: "updatedAt",
    accessorFn: (row) => row.updatedAt,
    enableHiding: true,
    header: () => <div>Updated at</div>,
    cell: ({ row }) => (
      <div>{moment(row.original.updatedAt).format("DD.MM.YYYY")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function Sites() {
  const query = trpc.sites.read.all.useQuery();

  if (query.isLoading) {
    <div>is Loading</div>;
  }

  if (query.isSuccess) {
    return (
      <SitesForm
        data={query.data}
        columns={columns}
        initialVisibilityState={{ createdAt: false, updatedAt: false }}
      ></SitesForm>
    );
  }
}
