"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Trash, X } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  onDelete: (rows: Row<TData>[]) => void;
  disabled?: boolean;
  identifier?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  disabled,
  identifier,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [categoriesData, setCategoriesData] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you absolutely sure?",
    "This action cannot be undone. This will permanently delete the selected account(s)"
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    if (identifier === "transactions") {
      const categories = data.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (acc: { label: string; value: string }[], item: any) => {
          if (item?.category) {
            if (!acc.some((entry) => entry.label === item.category)) {
              acc.push({
                label: item.category,
                value: item.category.toLowerCase(),
              });
            }
            return acc;
          }
          return [];
        },
        []
      );
      setCategoriesData(categories);
    }
  }, [data, identifier]);

  console.log(data);

  return (
    <>
      <ConfirmationDialog />
      <div className="flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 items-center py-4">
        <Input
          placeholder={`Filter ${filterKey}...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex justify-between lg:justify-start items-center w-full gap-x-2">
          {table.getColumn("category") && (
            <DataTableFacetedFilter
              column={table.getColumn("category")}
              title="Categories"
              options={categoriesData}
            />
          )}

          {isFiltered && (
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
            >
              Reset
              <X />
            </Button>
          )}
        </div>

        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            size="sm"
            variant="outline"
            className="ml-auto font-normal text-xs"
            disabled={disabled}
            onClick={async () => {
              const ok = await confirm();

              if (ok) {
                onDelete(table.getFilteredSelectedRowModel().rows);
                table.resetRowSelection();
              }
            }}
          >
            <Trash className="size-4 mr-2" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        )}
      </div>

      <div className="rounded-md border">
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

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

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
    </>
  );
}
