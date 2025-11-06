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

  if (userRole === "faculty") {
    const { data: profile } = await supabase
      .from("staff_profiles")
      .select("full_name, title")
      .eq("id", user?.id)
      .single();
    userProfile = profile;
  }

  const items = [
    {
      title: "Dashboard",
      url: "/protected/faculty/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Student List",
      url: "/protected/faculty/student-list",
      icon: History,
    },
  ];
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <BriefcaseMedical className="h-6 w-6" />
            <span className="font-semibold">VSU NCS</span>
          </div>
          <div className="w-10" />
        </div>

        <div className="z-50 bg-white">
          <AppSidebar
            items={items}
            profile={`${userProfile?.title} ${userProfile?.full_name}`}
            role="Faculty"
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] pt-16 md:pt-0 md:pl-64">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
