import { LucideProps } from "lucide-react";

export interface SidebarProps {
  title: string;
  url: string;
  icon: React.ComponentType<LucideProps>;
}

//Raw Data
export type StudentProfile = {
  id: string;
  full_name: string;
  student_id: string;
  year_level: number;
  sex: string;
};

export type StaffProfile = {
  id: string;
  full_name: string;
  employee_id: string;
  title: string;
  sex: string;
};

export type ConductReport = {
  id: string;
  created_at: string;
  student_id: string;
  faculty_id: string;
  description: string;
  is_serious_infraction: boolean;
  sanction_days: number;
  sanction_other: string | null;
};

export type ConductReportWithReporter = ConductReport & {
  staff_profiles: Pick<StaffProfile, "full_name" | "title">;
};

export type ConductReportWithStudent = ConductReport & {
  student_profiles: Pick<StudentProfile, "full_name" | "student_id">;
};

//Clean Data
export type StudentConductRecord = {
  id: string;
  date: string;
  reporter: string;
  description: string;
  sanction_days: number;
  is_serious_infraction: boolean;
  type: "Merit" | "Demerit" | "Serious Infraction";
  sanction_other: string | null;
};

export type FacultyStudentRecord = {
  id: string;
  full_name: string;
  student_id: string;
  year_level: number;
  sex: string;
  net_sanction: number;
};