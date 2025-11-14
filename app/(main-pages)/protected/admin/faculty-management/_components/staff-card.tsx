import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type StaffCardProps = {
  id: string;
  full_name: string;
  role: string;
  employee_id: string;
  title: string;
  sex: string;
};
export default function StaffCard({
  id,
  full_name,
  role,
  employee_id,
  title,
  sex,
}: StaffCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{role}</CardTitle>
        <CardDescription>{employee_id}</CardDescription>
        <CardAction>
          <Button>
            <Link href={`/records/staff/${id}`}>View</Link>
          </Button>
        </CardAction>
        <CardContent>{`${title} ${full_name}`}</CardContent>
      </CardHeader>
      <CardFooter className="flex flex-col items-start">
        <p>{`Sex: ${sex}`}</p>
      </CardFooter>
    </Card>
  );
}
