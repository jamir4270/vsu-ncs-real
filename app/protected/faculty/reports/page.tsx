import ReportCardList from "./_components/report-card-list";
import { RecordCardProps } from "../dashboard/_components/record-card";
import { createClient } from "@/lib/supabase/server";

export default async function ReportsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: records } = await supabase
    .from("conduct_reports")
    .select("*, student_profiles(full_name, student_id)")
    .eq("faculty_id", user?.id)
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col w-full p-8 gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0A58A3] text-2xl">My Conduct Records</h1>
        <p className="text-[#6C757D]">
          Complete record of all merits, demerits, and serious infractions.
        </p>
      </div>
      <div>
        <ReportCardList data={records ?? []} />
      </div>
    </div>
  );
}
