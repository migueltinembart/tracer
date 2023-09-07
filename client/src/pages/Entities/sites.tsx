import { trpc } from "@/lib/trpc";
import { SitesForm } from "./Form";
import { ColumnDef } from "@tanstack/react-table";
import { RouterOutput } from "@/lib/trpc";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

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
    accessorKey: "name",
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "groupName",
    header: () => <div>Group</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("groupName")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    enableHiding: true,
    header: () => <div>Created at</div>,
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    accessorKey: "updatedAt",
    enableHiding: true,
    header: () => <div>Updated at</div>,
    cell: ({ row }) => <div>{row.getValue("updatedAt")}</div>,
  },
];

export function Sites() {
  const query = trpc.sites.read.all.useQuery();

  if (query.isLoading) {
    <div>is Loading</div>;
  }

  if (query.isSuccess) {
    return <SitesForm data={query.data} columns={columns} initialVisibilityState={{createdAt: false, updatedAt: false}}></SitesForm>;
  }
}
