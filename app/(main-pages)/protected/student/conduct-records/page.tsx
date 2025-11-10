import { StudentConductRecord } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { columns } from "@/app/(detail-pages)/records/_components/conduct-records-column";
import ConductCardList from "@/app/(detail-pages)/records/_components/conduct-card-list";
import { DataTable } from "@/app/(detail-pages)/records/_components/conduct-records-table";

async function getData(): Promise<StudentConductRecord[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: records } = await supabase
    .from("conduct_reports")
    .select("*, staff_profiles (full_name, title)")
    .eq("student_id", user?.id)
    .order("created_at", { ascending: false });

  const data: StudentConductRecord[] =
    records?.map((record) => ({
      id: record.id,
      date: record.created_at,
      reporter: `${record.staff_profiles.title} ${record.staff_profiles.full_name}`,
      sanction_days: record.sanction_days,
      description: record.description,
      is_serious_infraction: record.is_serious_infraction,
      type: record.is_serious_infraction
        ? "Serious Infraction"
        : record.sanction_days > 0
        ? "Demerit"
        : "Merit",
      sanction_other: record.sanction_other,
    })) || [];

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
