import { columns, StudentProfile } from "./_components/columns";
import { createClient } from "@/lib/supabase/server";
import { DataTable } from "./_components/data-table";
import ConductCardList from "./_components/conduct-card-list";

async function getData(): Promise<StudentProfile[]> {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("student_profiles")
    .select("*")
    .order("full_name", { ascending: false });

  const { data: reports } = await supabase.from("conduct_reports").select("*");

  const sanctionTotals = (reports || []).reduce((acc, report) => {
    const studentId = report.student_id;
    const days = report.sanction_days;

    acc[studentId] = (acc[studentId] || 0) + days;
    return acc;
  }, {} as Record<string, number>);

  const data: StudentProfile[] =
    profiles?.map((record) => {
      const netSanction = sanctionTotals[record.id] || 0;

      return {
        id: record.id,
        full_name: record.full_name,
        student_id: record.student_id,
        year_level: record.year_level,
        sex: record.sex,
        net_sanction: netSanction,

        // These fields are invalid here, they must be removed.
        // description: record.description,
        // is_serious_infraction: record.is_serious_infraction,
        // type: ...
      };
    }) || [];

  return data;
}
export default async function ConductRecords() {
  const data = await getData();
  return (
    <div className="flex flex-col w-full p-8 gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0A58A3] text-2xl">My Conduct Records</h1>
        <p className="text-[#6C757D]">
          Complete record of all merits, demerits, and serious infractions.
        </p>
      </div>
      <div className="hidden md:block container mx-auto p-4 bg-white rounded-2xl">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="md:hidden">
        <ConductCardList data={data} />
      </div>
    </div>
  );
}
