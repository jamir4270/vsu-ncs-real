"use server";
import { createClient } from "./supabase/server";
import {
  StudentProfile,
  StaffProfile,
  ConductReportWithReporter,
  StudentConductRecord,
  FacultyStudentRecord,
  ConductReportWithStudent,
} from "@/types";

export async function fetchStudentProfiles() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("student_profiles").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as StudentProfile[];
  } catch (error) {
    console.error("Database Error: Failed to fetch student profiles.", error);

    throw new Error("Failed to fetch student profiles.");
  }
}

export async function fetchStudentProfile(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("student_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error: Failed to fetch student profile.", error);
    throw new Error("Failed to fetch student profile.");
  }
}

export async function fetchStaffProfile(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("staff_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Database error: Failed to fetch student profile.", error);
    throw new Error("Failed to fetch student profile.");
  }
}

export async function fetchStaffProfiles() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("staff_profiles").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as StaffProfile[];
  } catch (error) {
    console.error("Database Error: Failed to fetch staff profiles.", error);

    throw new Error("Failed to fetch staff profiles.");
  }
}

export async function fetchStaffProfilesAdmin() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("staff_profiles")
      .select("*")
      .neq("id", user?.id);

    if (error) {
      throw new Error(error.message);
    }

    return data as StaffProfile[];
  } catch (error) {
    console.error("Database Error: Failed to fetch staff profiles.", error);

    throw new Error("Failed to fetch staff profiles.");
  }
}

export async function fetchStudentConductRecords(id: string) {
  const rawRecord = await fetchStudentConductRecordsWithReporter(id);

  const processedRecord: StudentConductRecord[] = rawRecord.map((record) => {
    return {
      id: record.id,
      date: record.created_at,
      reporter: `${record.staff_profiles.title} ${record.staff_profiles.full_name}`,
      description: record.description,
      sanction_days: record.sanction_days,
      is_serious_infraction: record.is_serious_infraction,
      type: record.is_serious_infraction
        ? "Serious Infraction"
        : record.sanction_days > 0
        ? "Demerit"
        : "Merit",
      sanction_other: record.sanction_other,
    };
  });

  return processedRecord;
}

export async function fetchStudentConductRecordsWithReporter(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("conduct_reports")
      .select("*, staff_profiles (full_name, title)")
      .eq("student_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as ConductReportWithReporter[];
  } catch (error) {
    console.error(
      "Database Error: Failed to fetch student conduct records with reporter.",
      error
    );
    throw new Error("Failed to fetch student conduct record with reporter.");
  }
}

export async function fetchFacultyReportsWithStudent(id: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("conduct_reports")
      .select("*, student_profiles (full_name, student_id)")
      .eq("faculty_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data as ConductReportWithStudent[];
  } catch (error) {
    console.error(
      "Database Error: Failed to fetch faculty reports with student.",
      error
    );
    throw new Error("Failed to fetch faculty reports with student.");
  }
}

export async function fetchFacultyStudentList() {
  const supabase = await createClient();

  try {
    const studentProfiles = await fetchStudentProfiles();

    const { data: reports, error: reportsError } = await supabase
      .from("conduct_reports")
      .select("student_id, sanction_days");

    if (reportsError) {
      throw new Error(reportsError.message);
    }

    const sanctionTotals = (reports || []).reduce((acc, report) => {
      acc[report.student_id] =
        (acc[report.student_id] || 0) + report.sanction_days;
      return acc;
    }, {} as Record<string, number>);

    const studentList = (studentProfiles || []).map((student) => ({
      id: student.id,
      full_name: student.full_name,
      student_id: student.student_id,
      year_level: student.year_level,
      sex: student.sex,
      net_sanction: sanctionTotals[student.id] || 0,
    }));

    return studentList as FacultyStudentRecord[];
  } catch (error) {
    console.log("Database error: Failed to fetch reports.", error);
    throw new Error("Failed to fetch student list data.");
  }
}

export async function searchStudentByNameOrID(query: string) {
  const supabase = await createClient();

  try {
    const { data: studentProfiles, error: profilesError } = await supabase
      .from("student_profiles")
      .select("*")
      .or(`full_name.ilike.%${query}%,` + `student_id.ilike.%${query}%`);

    if (profilesError) {
      throw new Error(profilesError.message);
    }

    if (!studentProfiles) {
      return [];
    }

    const studentIDs = studentProfiles.map((profile) => profile.id);

    const { data: reports, error: reportsError } = await supabase
      .from("conduct_reports")
      .select("*")
      .in("student_id", studentIDs);

    if (reportsError) {
      throw new Error(reportsError.message);
    }

    const sanctionTotals = (reports || []).reduce((acc, report) => {
      acc[report.student_id] =
        (acc[report.student_id] || 0) + report.sanction_days;
      return acc;
    }, {} as Record<string, number>);

    const studentList = (studentProfiles || []).map((student) => ({
      id: student.id,
      full_name: student.full_name,
      student_id: student.student_id,
      year_level: student.year_level,
      sex: student.sex,
      net_sanction: sanctionTotals[student.id] || 0,
    }));

    return studentList as FacultyStudentRecord[];
  } catch (error) {
    console.log("Database error: Failed to fetch student.", error);
    throw new Error("Failed to fetch student.");
  }
}

export async function fetchDefaultStudentList() {
  const supabase = await createClient();

  try {
    const { data: studentProfiles, error: profilesError } = await supabase
      .from("student_profiles")
      .select("*")
      .limit(50);

    if (profilesError) {
      throw new Error(profilesError.message);
    }

    if (!studentProfiles) {
      return [];
    }

    const studentIDs = studentProfiles.map((profile) => profile.id);

    const { data: reports, error: reportsError } = await supabase
      .from("conduct_reports")
      .select("*")
      .in("student_id", studentIDs);

    if (reportsError) {
      throw new Error(reportsError.message);
    }

    const sanctionTotals = (reports || []).reduce((acc, report) => {
      acc[report.student_id] =
        (acc[report.student_id] || 0) + report.sanction_days;
      return acc;
    }, {} as Record<string, number>);

    const studentList = (studentProfiles || []).map((student) => ({
      id: student.id,
      full_name: student.full_name,
      student_id: student.student_id,
      year_level: student.year_level,
      sex: student.sex,
      net_sanction: sanctionTotals[student.id] || 0,
    }));

    return studentList as FacultyStudentRecord[];
  } catch (error) {
    console.log("Database error: Failed to fetch default student list.", error);
    throw new Error("Failed to fetch default student list.");
  }
}
