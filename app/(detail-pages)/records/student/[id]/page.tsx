import { fetchStudentConductRecords, fetchStudentProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import { columns } from "../../_components/conduct-records-column";
import { DataTable } from "../../_components/conduct-records-table";
import ConductCardList from "../../_components/conduct-card-list";
import TotalsCard from "../../_components/totals-card";
import InfoCard from "../../_components/info-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StudentConductRecord } from "@/types";
import { parseName } from "@/lib/utils";
import { profile } from "console";

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

  const full_name = parseName(
    student.first_name,
    student.middle_name,
    student.last_name,
    student.suffix
  );

  return (
    <div className="flex flex-col p-10 gap-5">
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Student Information</CardTitle>
            <CardDescription>
              Personal details and academic details
            </CardDescription>
            <CardContent className="flex flex-col md:flex-row px-0 pt-4 justify-between ">
              <InfoCard title={"Full Name"} description={full_name} />
              <InfoCard title={"Student ID"} description={student.student_id} />
              <InfoCard title={"Year Level"} description={student.year_level} />
              <InfoCard title={"Sex"} description={student.sex} />
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
