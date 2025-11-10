import { createClient } from "@/lib/supabase/server";
import { columns } from "@/app/(detail-pages)/records/_components/conduct-records-column";
import ConductCardList from "@/app/(detail-pages)/records/_components/conduct-card-list";
import { DataTable } from "@/app/(detail-pages)/records/_components/conduct-records-table";
import { fetchStudentConductRecords } from "@/lib/data";

export default async function ConductRecords() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await fetchStudentConductRecords(user?.id as string);
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
