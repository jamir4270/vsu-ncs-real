import ReportCardList from "./_components/report-card-list";
import { useClient } from "@/lib/supabase/server";

export default async function ReportsPage() {
  const supabase = await useClient();

  return (
    <div className="flex flex-col w-full p-8 gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0A58A3] text-2xl">My Conduct Records</h1>
        <p className="text-[#6C757D]">
          Complete record of all merits, demerits, and serious infractions.
        </p>
      </div>
      <div>
        <StudentCardList data={data} />
      </div>
    </div>
  );
}
