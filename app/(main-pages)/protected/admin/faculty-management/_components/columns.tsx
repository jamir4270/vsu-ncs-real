"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StaffProfile } from "@/types"; // dropdown-menu not used in this file

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
/*export type StaffProfileProcessed = {
  id: string;
  full_name: string;
  role: string;
  title: string;
  employee_id: string;
  sex: string;
};;*/

export const columns: ColumnDef<StaffProfile>[] = [
  { accessorKey: "full_name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "employee_id",
    header: "ID",
    /*filterFn: (row, columnId, filterValue) => {
      const id = row.original.employee_id.toLowerCase();
      const name = row.original.full_name.toLowerCase();
      const searchValue = (filterValue as string).toLowerCase();

      return id.includes(searchValue) || name.includes(searchValue);
    },*/
  },

  { accessorKey: "sex", header: "Sex" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button>
          <Link href={`/records/staff/${row.original.id}`}>View</Link>
        </Button>
      );
    },
  },
];
