"use client";

import { use, useState } from "react";
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
  const [reportCount, setReportCount] = useState(data.length);

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
    setReportCount(tempReports.length);
  }

  function filterByType(value: string) {
    tempReports = safeReports.filter((record) => {
      if (value === "Serious Infraction") {
        return record.is_serious_infraction;
      } else if (value === "Merit") {
        return record.sanction_days < 0;
      } else if (value === "Demerit") {
        return record.sanction_days > 0;
      } else {
        return safeReports;
      }
    });
    setType(value);
    setReports(tempReports);
    setReportCount(tempReports.length);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="text-[18px]">
          <h1 className="font-semibold">Conduct Reports</h1>
          <p className="text-[#6C757D]">{`${reportCount} record(s) found`}</p>
        </div>
        <div className="flex flex-row gap-4">
          <Input
            placeholder="Search by id or name..."
            onChange={(event) => {
              searchFilter(event.target.value ?? "");
            }}
          />
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
      <div className="flex flex-col gap-4">
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
