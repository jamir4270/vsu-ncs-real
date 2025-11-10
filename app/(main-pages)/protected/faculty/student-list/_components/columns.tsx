"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FacultyStudentRecord } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
/*export type StudentProfile = {
  id: string;
  full_name: string;
  student_id: string;
  year_level: number;
  sex: string;
  net_sanction: number;
};*/

export const columns: ColumnDef<FacultyStudentRecord>[] = [
  { accessorKey: "full_name", header: "Name" },
  {
    accessorKey: "student_id",
    header: "Student ID",
    filterFn: (row, columnId, filterValue) => {
      const stud_id = row.original.student_id.toLowerCase();
      const name = row.original.full_name.toLowerCase();
      const searchValue = (filterValue as string).toLowerCase();

      return stud_id.includes(searchValue) || name.includes(searchValue);
    },
  },
  { accessorKey: "year_level", header: "Year Level" },
  { accessorKey: "sex", header: "Sex" },
  { accessorKey: "net_sanction", header: "Net Sanction (Days)" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button>
          <Link href={`/records/student/${row.original.id}`}>View</Link>
        </Button>
      );
    },
  },
];
