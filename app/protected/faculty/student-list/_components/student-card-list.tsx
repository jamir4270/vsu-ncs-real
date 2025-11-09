"use client";

import { FacultyStudentRecord } from "@/types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import StudentCard from "./student-card";

type StudentCardListProps = {
  data: FacultyStudentRecord[];
};

export default function StudentCardList({ data }: StudentCardListProps) {
  let records = data;
  const safeRecords = data;
  const [studentRecords, setStudentRecords] = useState(safeRecords);

  function searchFilter(value: string) {
    records = safeRecords.filter((record) => {
      return (
        record.student_id.includes(value) ||
        record.full_name.toLowerCase().includes(value.toLowerCase())
      );
    });
    setStudentRecords(records);
  }
  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Search by id or name..."
        onChange={(event) => {
          searchFilter(event.target.value ?? "");
        }}
      />
      {studentRecords.map((record) => (
        <StudentCard
          key={record.id}
          id={record.id}
          full_name={record.full_name}
          student_id={record.student_id}
          year_level={record.year_level}
          sex={record.sex}
          net_sanction={record.net_sanction}
        />
      ))}
    </div>
  );
}
