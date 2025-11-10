import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RecordsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/protected/records/student-list">
        <ArrowLeft />
      </Link>
      <main>{children}</main>
    </div>
  );
}
