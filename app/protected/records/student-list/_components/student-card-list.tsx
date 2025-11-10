"use client";

import { FacultyStudentRecord } from "@/types";
import { useState, useEffect, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import StudentCard from "./student-card";
import { searchStudentByNameOrID } from "@/lib/data";

type StudentCardListProps = {
  data: FacultyStudentRecord[];
};

export default function StudentCardList({ data }: StudentCardListProps) {
  const safeRecords = data;
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [studentRecords, setStudentRecords] = useState(safeRecords);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setStudentRecords(safeRecords);
    }

    startTransition(async () => {
      const newList = await searchStudentByNameOrID(debouncedQuery);
      setStudentRecords(newList);
    });
  }, [debouncedQuery, safeRecords]);

  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Search by id or name..."
        onChange={(event) => {
          setQuery(event.target.value ?? "");
        }}
        value={query}
      />
      {isPending && <div>Loading...</div>}
      {!isPending &&
        studentRecords.map((record) => (
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
