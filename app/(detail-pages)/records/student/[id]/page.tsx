import { fetchStudentConductRecords, fetchStudentProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import { columns } from "../../_components/conduct-records-column";
import { DataTable } from "../../_components/conduct-records-table";
import ConductCardList from "../../_components/conduct-card-list";
import TotalsCard from "../../_components/totals-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const student = await fetchStudentProfile(studentID);
  const conductRecords = await fetchStudentConductRecords(studentID);
  function countSanctionDays(records: StudentConductRecord[]) {
    let merit = 0;
    let demerit = 0;
    let netSanction = 0;

    for (let i = 0; i < records.length; i++) {
      const sanction = records[i].sanction_days ?? 0;
      merit += sanction < 0 ? sanction : 0;
      demerit += sanction > 0 ? sanction : 0;
      netSanction += sanction;
    }

    return { merit, demerit, netSanction };
  }
  const sanctionCount = countSanctionDays(conductRecords);

  const netSanctionDays = sanctionCount.netSanction;
  const totalDemerits = sanctionCount.demerit;
  const totalMerits = Math.abs(sanctionCount.merit);

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
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <TotalsCard
          title="Net Sanction Days"
          total={netSanctionDays}
          color="text-[#FF6900]"
          description={`Equivalent to ${netSanctionDays * 8} hours of service`}
        />
        <TotalsCard
          title="Total Demerits"
          total={totalDemerits}
          color="text-[#0A58A3]"
          description="This semester"
        />
        <TotalsCard
          title="Total Merits"
          total={totalMerits}
          color="text-[#00C950]"
          description="This semester"
        />
      </div>
      <div className="hidden md:block">
        <DataTable columns={columns} data={conductRecords} />
      </div>
      <div className="md:hidden">
        <ConductCardList data={conductRecords} />
      </div>
    </div>
  );
}
