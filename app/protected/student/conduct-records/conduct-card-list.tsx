"use client";

import ConductCard from "../dashboard/_components/conduct-card";
import { Record } from "./columns";
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
import { Button } from "@/components/ui/button";

type ConductCardListProps = {
  data: Record[];
};

export default function ConductCardList({ data }: ConductCardListProps) {
  const [type, setType] = useState("All Types");
  let records = data;
  const safeRecords = data;
  const [conductRecords, setConductRecords] = useState(safeRecords);

  function filterByType(type: string) {
    setType(type);
    records = safeRecords.filter((record) => {
      if (type === "Serious Infraction") {
        return record.type === "Serious Infraction";
      } else if (type === "Merit") {
        return record.type === "Merit";
      } else if (type === "Demerit") {
        return record.type === "Demerit";
      } else {
        return safeRecords;
      }
    });
    setConductRecords(records);
  }
  return (
    <div className="flex flex-col gap-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            {type} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={type === "All Type"}
            onCheckedChange={() => filterByType("All Type")}
          >
            All Types
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={type === "Merit"}
            onCheckedChange={() => filterByType("Merit")}
          >
            Merit
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={type === "Demerit"}
            onCheckedChange={() => filterByType("Demerit")}
          >
            Demerit
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={type === "Serious Infraction"}
            onCheckedChange={() => filterByType("Serious Infraction")}
          >
            Serious Infraction
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {conductRecords.map((record) => (
        <ConductCard
          key={record.id}
          description={record.description}
          value={record.sanction_days}
          type={record.sanction_days > 0 ? "demerit/s" : "merit/s"}
          date={new Date(record.date).toISOString().split("T")[0]}
          reporter={record.reporter}
          badge_color={
            record.is_serious_infraction
              ? "bg-[#FB2C36]"
              : record.sanction_days > 0
              ? "bg-[#FF6900]"
              : "bg-[#00C950]"
          }
          border_color={
            record.is_serious_infraction
              ? "border-[#FB2C36]"
              : record.sanction_days > 0
              ? "border-[#FF6900]"
              : "border-[#00C950]"
          }
        />
      ))}
    </div>
  );
}
