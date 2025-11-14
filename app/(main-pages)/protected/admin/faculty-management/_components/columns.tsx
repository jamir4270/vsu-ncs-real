"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StaffProfile } from "@/types";
import { parseName } from "@/lib/utils"; // dropdown-menu not used in this file

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
  {
    id: "full_name",
    header: "Name",
    accessorFn: (row) =>
      parseName(row.first_name, row.middle_name, row.last_name, row.suffix),
  },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "employee_id",
    header: "ID",
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
