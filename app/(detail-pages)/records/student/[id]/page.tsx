import { fetchStudentConductRecords, fetchStudentProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import { columns } from "../../_components/conduct-records-column";
import { DataTable } from "../../_components/conduct-records-table";
import ConductCardList from "../../_components/conduct-card-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const student = await fetchStudentProfile(studentID);
  const conductRecords = await fetchStudentConductRecords(studentID);

  return (
    <div className="flex flex-col p-10 gap-5">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>
              Personal details and academic details
            </CardDescription>
            <CardContent className="flex flex-row flex-wrap px-0 pt-4 justify-between ">
              <div className="flex-1">
                <p>Full Name</p>
                <h1>{student.full_name}</h1>
              </div>
              <div className="flex-1">
                <p>Student ID</p>
                <h1>{student.student_id}</h1>
              </div>
              <div className="flex-1">
                <p>Year Level</p>
                <h1>{student.year_level}</h1>
              </div>
              <div className="flex-1">
                <p>Sex</p>
                <h1>{student.sex}</h1>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      <div>Summary Cards here</div>
      <div className="hidden md:block">
        <DataTable columns={columns} data={conductRecords} />
      </div>
      <div className="md:hidden">
        <ConductCardList data={conductRecords} />
      </div>
    </div>
  );
}
