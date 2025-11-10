import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function RecordsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userRole = user?.app_metadata?.role as string;
  const returnURL =
    userRole === "admin"
      ? "/protected/admin/student-management"
      : "/protected/faculty/student-list";
  return (
    <div>
      <Link href={returnURL}>
        <ArrowLeft />
      </Link>
      <main>{children}</main>
    </div>
  );
}
