import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import StaffCardList from "./_components/staff-card-list";
import { fetchStaffProfilesAdmin } from "@/lib/data";

export default async function ConductRecords() {
  const data = await fetchStaffProfilesAdmin();
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
        <StaffCardList data={data} />
      </div>
    </div>
  );
}
