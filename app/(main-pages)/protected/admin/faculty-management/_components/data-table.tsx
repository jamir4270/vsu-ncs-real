"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";
import { StaffProfile } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const safeProfiles = data as StaffProfile[];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [role, setRole] = React.useState("All Roles");
  const [query, setQuery] = useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [profiles, setProfiles] = useState(safeProfiles);
  const table = useReactTable({
    data: profiles as TData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  function filterByRole(role: string) {
    setRole(role);
    table.getColumn("role")?.setFilterValue(role === "All Roles" ? "" : role);
  }

  function searchByNameOrID(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    const result = safeProfiles.filter((profile) => {
      const idMatch = profile.employee_id
        .toLowerCase()
        .includes(lowerCaseQuery);
      const nameMatch =
        profile.first_name.toLowerCase().includes(lowerCaseQuery) ||
        profile.middle_name.toLowerCase().includes(lowerCaseQuery) ||
        profile.last_name.toLowerCase().includes(lowerCaseQuery) ||
        profile.suffix.toLowerCase().includes(lowerCaseQuery);

      return idMatch || nameMatch;
    });
    setQuery(query);
    setProfiles(result);
  }

  return (
    <div>
      <Card className="space-y-6 px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[18px]">
            <h1 className="font-semibold">Staff Profiles</h1>
            <p className="text-[#6C757D]">{`${table.getRowCount()} record(s) found`}</p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Input
              placeholder="Search faculty by name or id..."
              value={query}
              onChange={(event) => searchByNameOrID(event.target.value)}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  {role} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={role === "All Roles"}
                  onCheckedChange={() => filterByRole("All Roles")}
                >
                  All Types
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={role === "Faculty"}
                  onCheckedChange={() => filterByRole("Faculty")}
                >
                  Faculty
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={role === "Admin"}
                  onCheckedChange={() => filterByRole("Admin")}
                >
                  Admin
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
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
                      <TableCell key={cell.id} className="whitespace-nowrap">
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
      </Card>
    </div>
  );
}
