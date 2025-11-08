import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StudentProfile } from "./columns";
import { StudentDialog } from "./student-dialog";

export default function StudentCard({
  id,
  full_name,
  student_id,
  year_level,
  sex,
  net_sanction,
}: StudentProfile) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{full_name}</CardTitle>
        <CardDescription>{student_id}</CardDescription>
        <CardAction>
          <StudentDialog id={id} />
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
