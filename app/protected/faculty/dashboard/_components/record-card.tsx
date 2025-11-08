"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

export type RecordCardProps = {
  student_name: string;
  student_id: string;
  description: string;
  value: number;
  type: string;
  date: string;
  badge_color: string;
  border_color: string;
};

export default function RecordCard({
  student_name,
  student_id,
  description,
  value,
  type,
  date,
  badge_color,
  border_color,
}: RecordCardProps) {
  return (
    <div>
      <Card className={`${border_color} flex-1`}>
        <CardHeader className="pb-2">
          <div className="flex flex-row justify-between">
            <CardTitle>{`${student_name} · (${student_id})`}</CardTitle>
            <Badge className={`${badge_color}`}>{`${Math.abs(
              value
            )} ${type}`}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <h1>{description}</h1>
          <p className="text-[#6C757D]">{date}</p>
        </CardContent>
      </Card>
    </div>
  );
}
