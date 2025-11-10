import {
  fetchStudentConductRecordsWithReporter,
  fetchStudentProfile,
} from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function StudentRecordPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const studentID = id;

  if (!studentID || studentID === "undefined") {
    notFound();
  }

  const studentProfile = await fetchStudentProfile(studentID);
  const conductRecords = await fetchStudentConductRecordsWithReporter(
    studentID
  );

  return <div>{studentProfile.full_name}</div>;
}
