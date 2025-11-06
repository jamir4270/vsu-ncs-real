import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

type ConductCardProps = {
  description: string;
  value: number;
  type: string;
  date: string;
  reporter: string;
  badge_color: string;
  border_color: string;
};

export default function ConductCard({
  description,
  value,
  type,
  date,
  reporter,
  badge_color,
  border_color,
}: ConductCardProps) {
  return (
    <div>
      <Card className={`${border_color} flex-1`}>
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle>{description}</CardTitle>
            <Badge className={`${badge_color}`}>{`${value} ${type}`}</Badge>
          </div>
          <CardDescription>
            {" "}
            {`${date} · Reported by ${reporter}`}
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
