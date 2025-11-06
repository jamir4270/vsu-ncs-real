import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { LayoutDashboard, History, BriefcaseMedical } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
export default async function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userRole = user?.app_metadata?.role;
  let userProfile = null;

  if (userRole === "student") {
    const { data: profile } = await supabase
      .from("student_profiles")
      .select("full_name")
      .eq("id", user?.id)
      .single();
    userProfile = profile;
  }

  const items = [
    {
      title: "Dashboard",
      url: "/protected/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Conduct History",
      url: "/protected/student/conduct-history",
      icon: History,
    },
  ];
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <BriefcaseMedical className="h-6 w-6" />
            <span className="font-semibold">VSU NCS</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Sidebar */}
        <div className="z-50">
          <AppSidebar items={items} profile={userProfile?.full_name ?? ""} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] pt-16 md:ml-60 md:pt-0">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
