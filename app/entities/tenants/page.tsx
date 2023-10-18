"use client";
import { trpc } from "@/app/_trpc/client";
import { RouterOutput } from "@/app/_trpc/client";
import { Checkbox } from "@/components/ui/checkbox";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import {
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { CreateButton } from "@/app/_components/createButton";
import TenantsForm from "@/app/entities/tenants/create/page";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export type TenantOutput = RouterOutput["entities"]["tenants"]["select"]["one"];

export default function Sites() {
  const [deleteItem, setDeleteItem] = useState<number>(0);
  const tenantDeleter = trpc.entities.tenants.delete.one.useMutation();
  const tenantQuery = trpc.entities.tenants.select.all.useQuery();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    updated_at: false,
    created_at: false,
    updated_by: false,
    created_by: false,
    description: false,
  });
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<TenantOutput>[] = [
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
      cell: ({ row }) => (
        <Link href={`/entities/tenants/${row.original.id}`}>
          <Button variant={"link"}>{row.original.name}</Button>
        </Link>
      ),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
    },
    {
      id: "description",
      accessorFn: (row) => row.description,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="capitalize">{column.id.split("_").join(" ")}</span>
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize pl-4">{row.getValue("description")}</div>
      ),
    },
    {
      id: "tenant_group",
      accessorFn: (row) => row.tenant_group?.name,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="capitalize">{column.id.split("_").join(" ")}</span>
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="pl-4">{row.getValue("tenant_group")}</div>
      ),
    },
    {
      id: "created_by",
      accessorFn: (row) => row.created_by?.name,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="capitalize">{column.id.split("_").join(" ")}</span>
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="pl-4">{row.getValue("created_by")}</div>
      ),
    },
    {
      id: "updated_by",
      accessorFn: (row) => row.updated_by?.name,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="capitalize">{column.id.split("_").join(" ")}</span>
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="pl-4">{row.getValue("updated_by")}</div>
      ),
    },
    {
      id: "created_at",
      accessorFn: (row) => row.created_at,
      enableHiding: true,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="capitalize">{column.id.split("_").join(" ")}</span>
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="pl-4">
          {moment(row.getValue("created_at")).format("DD.MM.YYYY")}
        </div>
      ),
    },
    {
      id: "updated_at",
      accessorFn: (row) => row.updated_at,
      enableHiding: true,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="capitalize">{column.id.split("_").join(" ")}</span>
            <CaretSortIcon className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="pl-4">
          {moment(row.getValue("updated_at")).format("DD.MM.YYYY")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div>Action</div>,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => setDeleteItem(row.original.id)}
                >
                  Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <DropdownMenuItem>edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tenantQuery.data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 25,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  if (tenantQuery.isLoading) {
    return <div>Loading</div>;
  }

  if (tenantQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <AlertDialog>
        <Dialog>
          <h1 className="text-3xl font-extrabold tracking-tight scroll-m-20 lg:text-3xl">
            Sites
          </h1>
          <div className="w-full">
            <div className="flex items-center justify-between py-4">
              <Input
                placeholder="Filter by Site..."
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <div className="flex gap-2">
                <CreateButton
                  goToElement={<TenantsForm />}
                  title="Create Tenant"
                ></CreateButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Columns <ChevronDownIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value: any) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end py-4 space-x-2">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  tenantDeleter.mutate(deleteItem);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Dialog>
      </AlertDialog>
    </>
  );
}
