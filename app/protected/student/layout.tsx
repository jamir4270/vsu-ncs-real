import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { LayoutDashboard, History, Bell, BriefcaseMedical } from "lucide-react";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    { title: "Dashboard", url: "/student/dashboard", icon: LayoutDashboard },
    {
      title: "Conduct History",
      url: "/student/conduct-history",
      icon: History,
    },
    { title: "Notifications", url: "/student/notifications", icon: Bell },
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
          <AppSidebar items={items} />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] pt-16 md:ml-56 md:pt-0">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
