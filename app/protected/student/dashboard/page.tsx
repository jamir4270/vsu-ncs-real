import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
//import { TriangleAlert } from "lucide-react";

export default function StudentDashBoard() {
  return (
    <div className="flex flex-col w-full p-8 gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-[#0A58A3] text-2xl">Welcome, Maria Santos!</h1>
        <p className="text-[#6C757D]">
          Here&apos;s an overview of your conduct record this semester.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-5">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total Demerit Hours</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h1 className="text-[#0A58A3] text-3xl">12</h1>
            <p className="text-[#6C757D]">This semester</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total Demerits</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h1 className="text-[#0A58A3] text-3xl">12</h1>
            <p className="text-[#6C757D]">Violations recorded</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Total Merits</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <h1 className="text-[#00C950] text-3xl">12</h1>
            <p className="text-[#6C757D]">Recognitions earned</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest merits and demerits</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Card className="flex-1 border-[#FF6900]">
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <CardTitle>Late Submission of Clinical Journal</CardTitle>
                  <Badge className="bg-[#FF6900]">2 hours</Badge>
                </div>
                <CardDescription>
                  2025-10-20 · Reported by Dr. Rodriguez
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="flex-1 border-[#00C950]">
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <CardTitle>Late Submission of Clinical Journal</CardTitle>
                  <Badge className="bg-[#00C950]">2 hours</Badge>
                </div>
                <CardDescription>
                  2025-10-20 · Reported by Dr. Rodriguez
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="flex-1 border-[#FF6900]">
              <CardHeader>
                <div className="flex flex-row justify-between">
                  <CardTitle>Late Submission of Clinical Journal</CardTitle>
                  <Badge className="bg-[#FF6900]">2 hours</Badge>
                </div>
                <CardDescription>
                  2025-10-20 · Reported by Dr. Rodriguez
                </CardDescription>
              </CardHeader>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
