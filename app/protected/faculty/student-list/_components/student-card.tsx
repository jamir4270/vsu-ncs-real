import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FacultyStudentRecord } from "@/types";
import { StudentDialog } from "./student-dialog";

export default function StudentCard({
  id,
  full_name,
  student_id,
  year_level,
  sex,
  net_sanction,
}: FacultyStudentRecord) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{full_name}</CardTitle>
        <CardDescription>{student_id}</CardDescription>
        <CardAction>
          <StudentDialog />
        </CardAction>
      </CardHeader>
      <CardContent>{`${net_sanction} days`}</CardContent>
      <CardFooter className="flex flex-col items-start">
        <p>{`Year Level: ${year_level}`}</p>
        <p>{`Sex: ${sex}`}</p>
      </CardFooter>
    </Card>
  );
}
