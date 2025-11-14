"use client";

import { useCallback, useState } from "react";
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

interface StudentProfile {
  student_id: string;
  full_name: string;
}

interface Report {
  id: string;
  student_profiles: StudentProfile;
  description: string;
  sanction_days: number;
  is_serious_infraction: boolean;
  created_at: string;
}

type ReportCardListProps = {
  data: Report[];
};

export default function ReportCardList({ data }: ReportCardListProps) {
  const [type, setType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [reports, setReports] = useState(data);
  const [reportCount, setReportCount] = useState(data.length);

  // Combined filter function that applies both search and type filters
  const applyFilters = useCallback(
    (search: string, filterType: string) => {
      const filtered = data.filter((item) => {
        // First apply search filter
        const matchesSearch =
          search === "" ||
          item.student_profiles.student_id.includes(search) ||
          item.student_profiles.last_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.student_profiles.middle_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.student_profiles.last_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.student_profiles.suffix
            .toLowerCase()
            .includes(search.toLowerCase());

        // Then apply type filter
        const matchesType =
          filterType === "All Types"
            ? true
            : filterType === "Serious Infraction"
            ? item.is_serious_infraction
            : filterType === "Merit"
            ? item.sanction_days < 0
            : filterType === "Demerit"
            ? item.sanction_days > 0
            : true;

        // Item must match both filters
        return matchesSearch && matchesType;
      });

      setReports(filtered);
      setReportCount(filtered.length);
    },
    [data]
  );

  // Handler for search input changes
  const handleSearch = useCallback(
    (value: string) => {
      setSearchQuery(value);
      applyFilters(value, type);
    },
    [type, applyFilters]
  );

  // Handler for type filter changes
  const handleTypeFilter = useCallback(
    (value: string) => {
      setType(value);
      applyFilters(searchQuery, value);
    },
    [searchQuery, applyFilters]
  );

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
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value ?? "")}
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
                onCheckedChange={() => handleTypeFilter("All Types")}
              >
                All Types
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={type === "Merit"}
                onCheckedChange={() => handleTypeFilter("Merit")}
              >
                Merit
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={type === "Demerit"}
                onCheckedChange={() => handleTypeFilter("Demerit")}
              >
                Demerit
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={type === "Serious Infraction"}
                onCheckedChange={() => handleTypeFilter("Serious Infraction")}
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
            student_name={`${parseName(
              item.student_profiles.first_name,
              item.student_profiles.middle_name,
              item.student_profiles.last_name,
              item.student_profiles.suffix
            )}`}
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
