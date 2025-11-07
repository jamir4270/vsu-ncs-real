import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TotalsCard from "./_components/totals-card";
import ConductCard from "./_components/conduct-card";

export default async function StudentDashBoard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const { data: record } = await supabase
    .from("conduct_reports")
    .select(`*, staff_profiles (full_name, title)`)
    .eq("student_id", user?.id)
    .order("created_at", { ascending: false });

  const safeRecords = record || [];

  const totalDemerits = safeRecords.filter(
    (row) => row.sanction_days > 0
  ).length;

  const totalMerits = safeRecords.length - totalDemerits;

  const netSanctionDays = totalDemerits - totalMerits;

  const recentConductArr = safeRecords.slice(0, 5);

  return (
    <div className="flex flex-col w-full p-8 gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0A58A3] text-2xl">{`Welcome, ${
          profile?.full_name ?? "Student"
        }!`}</h1>
        <p className="text-[#6C757D]">
          Here&apos;s an overview of your conduct record this semester.
        </p>
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
      <div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest merits and demerits</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {recentConductArr.map((conduct) => (
              <ConductCard
                key={conduct.id}
                description={conduct.description}
                value={Math.abs(conduct.sanction_days)}
                type={conduct.sanction_days > 0 ? "demerit/s" : "merit/s"}
                date={new Date(conduct.created_at).toISOString().split("T")[0]}
                reporter={`${conduct.staff_profiles.title} ${conduct.staff_profiles.full_name}`}
                badge_color={
                  conduct.is_serious_infraction
                    ? "bg-[#FB2C36]"
                    : conduct.sanction_days > 0
                    ? "bg-[#FF6900]"
                    : "bg-[#00C950]"
                }
                border_color={
                  conduct.is_serious_infraction
                    ? "border-[#FB2C36]"
                    : conduct.sanction_days > 0
                    ? "border-[#FF6900]"
                    : "border-[#00C950]"
                }
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
