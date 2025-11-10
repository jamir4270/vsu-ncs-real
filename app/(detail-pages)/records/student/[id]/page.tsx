import {
  fetchStudentConductRecords,
  fetchStudentConductRecordsWithReporter,
  fetchStudentProfile,
} from "@/lib/data";
import { notFound } from "next/navigation";
import { columns } from "../../_components/conduct-records-column";
import { DataTable } from "../../_components/conduct-records-table";
import { StudentConductRecord } from "@/types";

export default async function StudentRecordPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const studentID = id;

  if (!studentID || studentID === "undefined") {
    notFound();
  }

  const studentProfile = await fetchStudentProfile(studentID);
  const conductRecords = await fetchStudentConductRecords(studentID);

  return (
    <div>
      <div>Profile Basic Information Here</div>
      <div>Summary Cards here</div>
      <div className="p-10">
        <DataTable
          columns={columns}
          data={conductRecords as StudentConductRecord[]}
        />
      </div>
    </div>
  );
}
