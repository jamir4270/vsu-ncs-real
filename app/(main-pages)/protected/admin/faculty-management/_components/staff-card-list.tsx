"use client";

import { StaffProfile } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import StaffCard from "./staff-card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type StudentCardListProps = {
  data: StaffProfile[];
};

export default function StaffCardList({ data }: StudentCardListProps) {
  const safeProfiles = data as StaffProfile[];
  const [role, setRole] = useState("All Roles");
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState(safeProfiles);

  function filterByRole(role: string) {
    setRole(role);
    const result = safeProfiles.filter((profile) => {
      return profile.role === "All Roles"
        ? safeProfiles
        : profile.role.includes(role);
    });
    setProfiles(result);
  }

  function searchByNameOrID(query: string) {
    const lowerCaseQuery = query.toLowerCase();
    const result = safeProfiles.filter((profile) => {
      const idMatch = profile.employee_id
        .toLowerCase()
        .includes(lowerCaseQuery);
      const nameMatch = profile.full_name
        .toLowerCase()
        .includes(lowerCaseQuery);

      return idMatch || nameMatch;
    });
    setQuery(query);
    setProfiles(result);
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Search by id or name..."
        onChange={(event) => {
          searchByNameOrID(event.target.value);
        }}
        value={query}
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
      {profiles.map((profile) => (
        <StaffCard
          key={profile.id}
          id={profile.id}
          full_name={profile.full_name}
          role={profile.role}
          employee_id={profile.employee_id}
          title={profile.title}
          sex={profile.sex}
        />
      ))}
    </div>
  );
}
