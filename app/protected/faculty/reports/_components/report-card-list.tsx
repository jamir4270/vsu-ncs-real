"use client";

import { useState } from "react";
import RecordCard from "../../dashboard/_components/record-card";
import { Input } from "@/components/ui/input";
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
type ReportCardListProps = {
  data: any[];
};

export default function ReportCardList({ data }: ReportCardListProps) {
  const [type, setType] = useState("All Types");
  const [reports, setReports] = useState(data);

  const safeReports = data;
  let tempReports = data;

  function searchFilter(value: string) {
    tempReports = safeReports.filter((item) => {
      return (
        item.student_profiles.student_id.includes(value) ||
        item.student_profiles.full_name
          .toLowerCase()
          .includes(value.toLowerCase())
      );
    });
    setReports(tempReports);
  }

  function filterByType(value: string) {
    setType(value);
    tempReports = safeReports.filter((record) => {
      if (type === "Serious Infraction") {
        return record.type === "Serious Infraction";
      } else if (type === "Merit") {
        return record.type === "Merit";
      } else if (type === "Demerit") {
        return record.type === "Demerit";
      } else {
        return safeReports;
      }
    });
    setReports(tempReports);
  }

  return (
    <div>
      <div>
        <div>
          <Input
            placeholder="Search by id or name..."
            onChange={(event) => {
              searchFilter(event.target.value ?? "");
            }}
          />
        </div>
        <div>
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
                checked={type === "All Types"}
                onCheckedChange={() => filterByType("All Types")}
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
        </div>
      </div>
      <div>
        {reports.map((item) => (
          <RecordCard
            key={item.id}
            student_name={item.student_profiles.full_name}
            student_id={item.student_profiles.student_id}
            description={item.description}
            value={item.sanction_days}
            type={item.sanction_days > 0 ? "demerit/s" : "merit/s"}
            date={new Date(item.created_at).toISOString().split("T")[0]}
            badge_color={
              item.is_serious_infraction
                ? "bg-[#FB2C36]"
                : item.sanction_days > 0
                ? "bg-[#FF6900]"
                : "bg-[#00C950]"
            }
            border_color={
              item.is_serious_infraction
                ? "border-[#FB2C36]"
                : item.sanction_days > 0
                ? "border-[#FF6900]"
                : "border-[#00C950]"
            }
          />
        ))}
      </div>
    </div>
  );
}
