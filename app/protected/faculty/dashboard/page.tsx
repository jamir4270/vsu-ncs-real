import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import TotalsCard from "./_components/totals-card";
import QuickActionCard from "./_components/quick-action-card";
import RecordCard from "./_components/record-card";

export default async function StudentDashBoard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const { data: record } = await supabase
    .from("conduct_reports")
    .select(`*, student_profiles (full_name, student_id)`)
    .eq("faculty_id", user?.id)
    .order("created_at", { ascending: false });

  const { data: students } = await supabase
    .from("student_profiles")
    .select("*")
    .order("full_name", { ascending: false });

  const safeRecords = record || [];

  const recentRecordArr = safeRecords.slice(0, 5);

  return (
    <div className="flex flex-col w-full p-8 gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0A58A3] text-2xl">{`Welcome, ${
          profile?.full_name ?? "Faculty"
        }!`}</h1>
        <p className="text-[#6C757D]">
          Here&apos;s an overview of your conduct record this semester.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <QuickActionCard />
        <TotalsCard
          title="Total Reports Logged"
          total={record?.length as number}
          color="text-[#FF6900]"
          description="This semester"
        />
        <TotalsCard
          title="Total Students"
          total={students?.length as number}
          color="text-[#00C950]"
          description="Active nursing students"
        />
      </div>
      <div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest merits and demerits</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {recentRecordArr.map((item) => (
              <RecordCard
                key={item.id}
                student_name={item.student_profiles.full_name}
                student_id={item.student_profiles.student_id}
                description={item.description}
                value={item.sanction_days}
                type={item.sanction_days > 0 ? "demerit/s" : "merit/s"}
                date={new Date(item.created_at).toISOString().split("T")[0]}
                badge_color={
                  item.is_serious_infraction
                    ? "bg-[#FB2C36]"
                    : item.sanction_days > 0
                    ? "bg-[#FF6900]"
                    : "bg-[#00C950]"
                }
                border_color={
                  item.is_serious_infraction
                    ? "border-[#FB2C36]"
                    : item.sanction_days > 0
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
