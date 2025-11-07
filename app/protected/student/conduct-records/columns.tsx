"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import React from "react";
// dropdown-menu not used in this file

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Record = {
  id: string;
  date: string;
  reporter: string;
  sanction_days: number;
  description: string;
  is_serious_infraction: boolean;
  type: "Merit" | "Demerit" | "Serious Infraction";
};

export const columns: ColumnDef<Record>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      const formattedDate = new Date(date).toISOString().split("T")[0];
      return formattedDate;
    },
  },
  {
    accessorKey: "reporter",
    header: "Reported By",
  },
  {
    accessorKey: "sanction_days",
    header: "Sanction",
    cell: ({ row }) => {
      const value = row.getValue("sanction_days");
      const is_serious_infraction = row.getValue("is_serious_infraction");
      const base =
        "inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium";
      if (typeof value === "number") {
        if (is_serious_infraction) {
          return (
            <Badge
              className={`${base} bg-red-600 text-white`}
            >{`${value} demerit/s`}</Badge>
          );
        } else if (value < 0) {
          return (
            <Badge className={`${base} bg-[#00C950] text-white`}>{`${Math.abs(
              value
            )} merit/s`}</Badge>
          );
        } else {
          return (
            <Badge
              className={`${base} bg-[#FF6900] text-white`}
            >{`${value} demerit/s`}</Badge>
          );
        }
      }
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "is_serious_infraction",
    header: () => null,
    cell: () => null,
    accessorFn: (row) => {
      return row.is_serious_infraction;
    },
  },
  {
    id: "type",
    header: () => null,
    cell: () => null,
    accessorFn: (row) => {
      if (row.is_serious_infraction) {
        return "Serious Infraction";
      } else if (row.sanction_days < 0) {
        return "Merit";
      } else {
        return "Demerit";
      }
    },
    filterFn: "equalsString",
  },
];
